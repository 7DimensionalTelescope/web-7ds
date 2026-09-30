# Deploying from GitHub

A commit pushed to `main` on
[7DimensionalTelescope/web-7ds](https://github.com/7DimensionalTelescope/web-7ds)
is live on 7ds.snu.ac.kr within about five minutes. That includes an edit
made in GitHub's web editor, where a collaborator changes a file in
`content/` and presses *Commit*. Nobody has to log in to the server.

## How it works

`deploy/autodeploy.sh` runs from cron every five minutes. The server pulls the
change; nothing pushes to it. The repository is public, so no credentials are
stored, and the server accepts no inbound connection for this. On each run:

1. It fetches `main`. If `main` has not moved, it stops there.
2. It unpacks the new commit into `~/7ds-live/releases/<sha>`, beside the
   running release, and builds it: content check, typecheck, CSS, Remix.
3. It starts that build on a spare port (3098) and requests every page that
   has a content file. Each one has to return 200 with a heading.
4. Only then does it point `~/7ds-live/current` at the new release and
   restart the site. If the restarted site does not answer, it switches back.

A commit that fails any step never reaches the site. The site keeps serving
the last good release. The failure goes to `~/7ds-live/deploy.log`, and the
commit is recorded in `~/7ds-live/failed/`, so it is not rebuilt every five
minutes. The next commit, usually the fix, is tried as normal.

It deploys forward only. If `main` is reset to an older or unrelated commit,
the deployer refuses it and does not roll the site back. Deploying such a
commit takes `--force`, run by hand.

A content-only change goes live in under a minute. A change to
`package-lock.json` reinstalls dependencies, which takes a few minutes.

## Everyday use

| To | Do |
|---|---|
| See what happened | `tail -30 ~/7ds-live/deploy.log` |
| See why a commit failed | `cat ~/7ds-live/failed/<sha>` |
| See what is live | `readlink ~/7ds-live/current` |
| Hold deployments | `touch ~/7ds-live/paused` (resume by deleting it) |
| Deploy now, without waiting for cron | `~/7ds-live/current/deploy/autodeploy.sh` |
| Roll back to an earlier release | `ln -sfn ~/7ds-live/releases/<sha> ~/7ds-live/current.new && mv -T ~/7ds-live/current.new ~/7ds-live/current && pm2 restart 7ds`, then `touch ~/7ds-live/paused` so the next run does not move it forward again |

The last five releases are kept for rollback.

**The working copy is no longer the site.** Once this is in place, the site
runs from `~/7ds-live/current`, not from `~/7ds`. An edit in `~/7ds` goes live
only when it is committed and pushed to `main`. To look at a change before
pushing it, run `npm run build` and then
`PORT=3005 node_modules/.bin/remix-serve build/index.js` in `~/7ds`. Use any
free port except 3001, which is the site's.

The site's configuration (`PORTAL_API_BASE`, `LINK_PORTAL`) is in
`~/7ds-live/shared/.env`. Each release links to it, and it is never in the
repository.

Anyone with write access to the GitHub repository can publish to the site. To
require review first, protect `main` on GitHub so that changes arrive by pull
request.

This covers the website only. The observation calculators (`7DT_calculator`,
pm2 apps `calc-*`) are deployed separately.

## Setting it up

Do this once, in order.

**1. Put the current site on GitHub.** `main` on GitHub still holds the first
commit, and the deployer would build that. From `~/7ds`:

```bash
git push origin redesign-2026
git push origin redesign-2026:main      # a fast-forward: main has nothing of its own
```

**2. Create the deploy directory and build `main` once.** This does not touch
the running site. The deployer sees that pm2's `7ds` still runs from `~/7ds`
and leaves it alone.

```bash
mkdir -p ~/7ds-live/shared
cp ~/7ds/.env ~/7ds-live/shared/.env && chmod 600 ~/7ds-live/shared/.env
~/7ds/deploy/autodeploy.sh --init
tail -5 ~/7ds-live/deploy.log            # expect "smoke: 26 pages checked" and "built"
```

**3. Switch the site over.** The site is down for about five seconds.

```bash
pm2 delete 7ds
pm2 start ~/7ds-live/current/deploy/site.config.cjs
pm2 save
curl -sI http://127.0.0.1:3001/ | head -1  # HTTP/1.1 200 OK
```

To undo this step: `pm2 delete 7ds && cd ~/7ds && pm2 start npm --name 7ds -- start && pm2 save`.

**4. Turn on the schedule.**

```bash
(crontab -l 2>/dev/null; echo '*/5 * * * * $HOME/7ds-live/current/deploy/autodeploy.sh >/dev/null 2>&1') | crontab -
```

Cron runs the deployer from the release that is live, so a change to the
deployer takes effect only after that change has itself deployed
successfully.
