#!/bin/bash
# ---------------------------------------------------------------------------
# Deploy the site from GitHub: a commit pushed to the deploy branch goes live
# without anyone logging in to this machine.
#
# It pulls rather than being pushed to. The server takes no inbound SSH and
# needs no credentials for this, because the repository is public. Run it from
# cron every few minutes. When the branch has moved, it:
#
#   1. unpacks the new commit into releases/<sha>, beside the running one,
#   2. builds it there (content check, typecheck, CSS, Remix),
#   3. starts the build on a spare port and requests every content page,
#      requiring each to return 200 with an <h1>,
#   4. only then points `current` at it and restarts the site,
#   5. rolls back to the previous release if the restarted site does not
#      answer.
#
# If any step fails, the site keeps running the last good release. The failed
# commit is recorded in failed/, so the script does not rebuild it every five
# minutes, and the reason goes to deploy.log. The next push is tried as usual.
#
# Layout under $DEPLOY_ROOT (default ~/7ds-live):
#   repo.git/          bare mirror of the deploy branch
#   releases/<sha>/    one directory per built commit (the last few are kept)
#   current -> releases/<sha>   what pm2 runs (deploy/site.config.cjs)
#   shared/.env        the site's configuration, linked into every release;
#                      never in the repository (see CLAUDE.md)
#   failed/<sha>       commits that did not pass, with the log excerpt
#   paused             if present, cron runs do nothing
#   deploy.log
#
#   autodeploy.sh --init   first-time setup; see deploy/AUTODEPLOY.md
#   autodeploy.sh          one check-and-deploy pass (what cron runs)
#   autodeploy.sh --force  deploy the branch head even if it is current or failed
# ---------------------------------------------------------------------------
set -euo pipefail

ROOT=${DEPLOY_ROOT:-$HOME/7ds-live}
BRANCH=${DEPLOY_BRANCH:-main}
REPO=${DEPLOY_REPO:-https://github.com/7DimensionalTelescope/web-7ds.git}
APP=${DEPLOY_APP:-7ds}
LIVE_PORT=${DEPLOY_LIVE_PORT:-3001}
CHECK_PORT=${DEPLOY_CHECK_PORT:-3098}
KEEP=${DEPLOY_KEEP:-5}

MIRROR=$ROOT/repo.git
LOG=$ROOT/deploy.log

# cron starts with an almost empty PATH, and the default node on this machine
# is too old for Remix: use the version the repository pins.
NODE_VERSION=${DEPLOY_NODE:-20.20.2}
export PATH="$HOME/.nvm/versions/node/v$NODE_VERSION/bin:/usr/local/bin:/usr/bin:/bin"

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') $*" >>"$LOG"; }

# Old git (1.8 on this host): no `git -C`, so every call names the repository.
g() { git --git-dir="$MIRROR" "$@"; }

init() {
  mkdir -p "$ROOT/releases" "$ROOT/shared" "$ROOT/failed"
  [ -d "$MIRROR" ] || git clone -q --bare "$REPO" "$MIRROR"
  if [ ! -f "$ROOT/shared/.env" ]; then
    echo "Put the site's .env in $ROOT/shared/.env (PORTAL_API_BASE, LINK_PORTAL), then run again." >&2
    exit 1
  fi
  echo "Initialized $ROOT. Deploying $BRANCH once now."
}

wait_for() { # url, seconds
  local i
  for ((i = 0; i < $2; i++)); do
    curl -s -o /dev/null "$1" && return 0
    sleep 1
  done
  return 1
}

# Every page that has a content file must render. This is the check that
# catches a content edit that builds but breaks a page.
smoke() { # release dir, port
  local rel=$1 port=$2 pid status=0 f url code n=0
  (cd "$rel" && PORT=$port NODE_ENV=production exec node_modules/.bin/remix-serve build/index.js) \
    >>"$LOG" 2>&1 &
  pid=$!
  if ! wait_for "http://127.0.0.1:$port/" 60; then
    log "smoke: server on :$port did not start"
    kill "$pid" 2>/dev/null || true
    return 1
  fi
  for f in $(cd "$rel/content/pages" && find . -name '*.yaml' | sort); do
    url=${f#.}
    url=${url%.yaml}
    [ "$url" = /home ] && url=/
    code=$(curl -s -o "$ROOT/smoke.html" -w '%{http_code}' "http://127.0.0.1:$port$url" || echo 000)
    if [ "$code" != 200 ] || ! grep -aq '<h1' "$ROOT/smoke.html"; then
      log "smoke: $url returned $code or rendered no <h1>"
      status=1
    fi
    n=$((n + 1))
  done
  log "smoke: $n pages checked"
  kill "$pid" 2>/dev/null || true
  wait "$pid" 2>/dev/null || true
  rm -f "$ROOT/smoke.html"
  # No pages found means the commit is not this site's layout at all — an old
  # or unrelated branch — which must not pass for an empty check.
  if [ "$n" -eq 0 ]; then
    log "smoke: no content pages found"
    return 1
  fi
  return $status
}

deploy() { # sha
  local sha=$1 short=${1:0:7} rel=$ROOT/releases/$1 prev=""
  [ -L "$ROOT/current" ] && prev=$(readlink "$ROOT/current")

  log "deploy $short: building"
  # Each step says `|| return 1` itself: deploy() runs as an `if` condition,
  # where bash suspends `set -e`.
  rm -rf "$rel"
  mkdir -p "$rel"
  g archive "$sha" | tar -x -C "$rel" || return 1
  ln -s "$ROOT/shared/.env" "$rel/.env" || return 1

  # Dependencies are reused, as hard links, when package-lock.json has not
  # changed. A clean install costs minutes and a gigabyte.
  if [ -n "$prev" ] && [ -d "$prev/node_modules" ] && cmp -s "$prev/package-lock.json" "$rel/package-lock.json"; then
    cp -al "$prev/node_modules" "$rel/node_modules" || return 1
  else
    (cd "$rel" && npm ci --no-audit --no-fund) >>"$LOG" 2>&1 || return 1
  fi

  (cd "$rel" && npm run typecheck && npm run build) >>"$LOG" 2>&1 || return 1
  smoke "$rel" "$CHECK_PORT" || return 1

  ln -sfn "$rel" "$ROOT/current.new" || return 1
  mv -T "$ROOT/current.new" "$ROOT/current" || return 1

  # On the very first deploy there is nothing to restart yet: pm2 is started
  # once by hand from the new `current` (deploy/AUTODEPLOY.md).
  if ! pm2 describe "$APP" >/dev/null 2>&1; then
    log "deploy $short: built; pm2 has no app $APP yet, so nothing was restarted"
    return 0
  fi
  # Nor while the app still runs from somewhere else (the working copy, before
  # the switch-over): restarting it would not serve this release.
  local runs_from
  runs_from=$(pm2 jlist 2>/dev/null | node -e '
    let s = ""; process.stdin.on("data", (d) => (s += d)).on("end", () => {
      const app = JSON.parse(s).find((p) => p.name === process.argv[1]);
      console.log(app ? app.pm2_env.pm_cwd : "");
    });' "$APP")
  if [ "$runs_from" != "$ROOT/current" ]; then
    log "deploy $short: built; pm2 app $APP runs from ${runs_from:-?}, not $ROOT/current, so nothing was restarted"
    return 0
  fi
  pm2 restart "$APP" >>"$LOG" 2>&1

  if ! wait_for "http://127.0.0.1:$LIVE_PORT/" 60; then
    log "deploy $short: live site did not answer after restart; rolling back"
    if [ -n "$prev" ]; then
      ln -sfn "$prev" "$ROOT/current.new"
      mv -T "$ROOT/current.new" "$ROOT/current"
      pm2 restart "$APP" >>"$LOG" 2>&1
    fi
    return 1
  fi

  log "deploy $short: live"
  # Keep the last few releases for a manual rollback; never the current one.
  (cd "$ROOT/releases" && ls -1t | tail -n +$((KEEP + 1)) | while read -r old; do
    [ "$ROOT/releases/$old" = "$(readlink "$ROOT/current")" ] || rm -rf "$old"
  done)
}

main() {
  mkdir -p "$ROOT"
  exec 9>"$ROOT/deploy.lock"
  # Keep the log to its recent past; cron runs this 288 times a day.
  if [ -f "$LOG" ] && [ "$(wc -l <"$LOG")" -gt 5000 ]; then
    tail -n 2000 "$LOG" >"$LOG.tmp" && mv "$LOG.tmp" "$LOG"
  fi
  flock -n 9 || exit 0 # a build is already running

  # `touch $ROOT/paused` holds deployments (cron keeps running, doing nothing).
  if [ -f "$ROOT/paused" ] && [ -z "${1:-}" ]; then exit 0; fi

  if [ "${1:-}" = --init ]; then init; fi
  [ -d "$MIRROR" ] || { echo "Run $0 --init first." >&2; exit 1; }

  g fetch -q origin "+refs/heads/$BRANCH:refs/heads/$BRANCH"
  local sha
  sha=$(g rev-parse "refs/heads/$BRANCH")

  if [ "${1:-}" != --force ]; then
    local running=""
    [ -L "$ROOT/current" ] && running=$(basename "$(readlink "$ROOT/current")")
    [ "$running" = "$sha" ] && exit 0
    [ -f "$ROOT/failed/$sha" ] && exit 0
    # Forward only. A branch reset to an older or unrelated commit would
    # otherwise quietly roll the site back; that takes --force, by hand.
    if [ -n "$running" ] && ! g merge-base --is-ancestor "$running" "$sha" 2>/dev/null; then
      log "deploy ${sha:0:7}: refused, not a descendant of the running ${running:0:7} (use --force)"
      echo "refused: not a descendant of the running release" >"$ROOT/failed/$sha"
      exit 1
    fi
  fi

  if deploy "$sha"; then
    rm -f "$ROOT/failed/$sha"
  else
    tail -n 40 "$LOG" >"$ROOT/failed/$sha"
    log "deploy ${sha:0:7}: FAILED; still serving $(basename "$(readlink "$ROOT/current" 2>/dev/null || echo none)")"
    exit 1
  fi
}

main "$@"
