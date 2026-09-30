# Commands that need sudo

Three things stand between the calculators running on lyman and the calculators
being served from 7ds.snu.ac.kr. An agent cannot do any of them. Everything
else — the Python environment, the apps themselves, the site — is already done
or needs no privilege.

Facts these commands rest on:

- 7ds is `gwuniverse.snu.ac.kr`, `147.46.40.62` (also `192.168.0.220`).
- lyman is `147.46.45.48`, and exports `/lyman/data1` to `20.20.20.0/24` and
  `10.1.1.0/24` only — 7ds is in neither, which is why the mount fails today.
- The site is HTTPS with `Content-Security-Policy: default-src 'self' ...`, so
  the calculators have to be same-origin. Nothing cross-origin can be framed.

## 1. Export the configuration folder to 7ds — ON LYMAN

The calculators read `/lyman/data1/7dt/configuration` for the live array state.
Export that folder alone rather than adding 7ds to the `/lyman/data1` line:
the web server has no business seeing the rest of data1, and the narrower
export is one line to audit.

```bash
# /etc/exports on lyman — a new line, leaving the existing data1 line alone
/lyman/data1/7dt/configuration  147.46.40.62(ro,sync,no_subtree_check)

sudo exportfs -ra
sudo exportfs -v | grep configuration     # confirm 147.46.40.62 is listed
```

Read-only is not a precaution, it is the requirement: this software never
writes there, and the folder holds credentials.

If the server runs NFSv4 and the export sits under an existing `fsid=0` root,
the client path is relative to that root rather than absolute — `exportfs -v`
will show which. The mount command below assumes NFSv3-style absolute paths,
which is what `showmount -e lyman.snu.ac.kr` currently reports.

## 2. Mount it — ON 7ds

Mounted at the same path it has on lyman, so nothing needs configuring: that
path is the default the calculators look in.

```bash
sudo mkdir -p /lyman/data1/7dt/configuration
sudo mount -t nfs -o ro,soft,timeo=30,retrans=3 \
  lyman.snu.ac.kr:/lyman/data1/7dt/configuration /lyman/data1/7dt/configuration
ls /lyman/data1/7dt/configuration        # observer.config, filtinfo.dict, ... expected

# persist across reboots
echo 'lyman.snu.ac.kr:/lyman/data1/7dt/configuration  /lyman/data1/7dt/configuration  nfs  ro,soft,timeo=30,retrans=3,_netdev  0 0' \
  | sudo tee -a /etc/fstab
```

`soft` matters: if lyman goes away, a hard mount would hang every Streamlit
worker that touches the folder, and they re-read it every minute.

If the mount is not wanted, the alternative is a read-only copy of the
configuration folder somewhere on 7ds and `SEVENDT_CONFIG_DIR` pointed at it.
That folder holds credentials, so copying it is a decision for the operator,
not a default.

## 3. Serve the calculators under 7ds.snu.ac.kr — ON 7ds

The apps are already running on this host (`pm2 ls` shows `calc-visibility`,
`calc-exposure`, `calc-overhead`, `calc-tiles`), each on 127.0.0.1 only. This
step makes nginx the way in.

```bash
cd /home/dtak/7ds
sudo cp deploy/calculators-map.conf   /etc/nginx/conf.d/calculators-map.conf
sudo cp deploy/calculators-proxy.inc  /etc/nginx/conf.d/calculators-proxy.inc
# Paste the four location blocks from deploy/calculators.nginx.conf into the
# `server { listen 443 ssl; ... }` block of /etc/nginx/conf.d/7ds.conf,
# ABOVE the existing `location / { ... }`.
sudo nginx -t && sudo systemctl reload nginx
```

Three files, three places, and the difference matters: `calculators-map.conf`
is an http-level `map` and nginx will not start if it is pasted inside a
server block; `calculators-proxy.inc` has a `.inc` extension so the
`conf.d/*.conf` glob does not load it on its own; the location blocks go
inside the 443 server block.

Tested before handing over, with a throwaway nginx running exactly this
configuration against the running apps: all four pages 200, `_stcore/health`
ok, and the websocket upgrade at `_stcore/stream` answers `101 Switching
Protocols` with `Host: 7ds.snu.ac.kr` and `Origin: https://7ds.snu.ac.kr`.

After the reload, check from outside:

```bash
curl -s https://7ds.snu.ac.kr/calculator/exposure/app/_stcore/health   # ok
```

No firewall change is needed: the apps listen on 127.0.0.1, so only nginx
reaches them.

## The mount as it is now

`/lyman/data1/7dt` is mounted over NFSv4.1 and the calculators read it without
trouble. Two of its options differ from what step 2 recommends, and both are
worth changing when convenient:

- **`rw`, not `ro`.** Nothing here writes to that folder, and the configuration
  folder holds credentials. Read-only makes that a guarantee rather than a habit.
- **`hard`, not `soft`.** If lyman becomes unreachable, a hard mount blocks
  every process that touches it until it comes back — and the four calculator
  processes re-read the configuration every minute, so they would all hang.
  `soft,timeo=30,retrans=3` makes them fail and recover instead.

```bash
sudo umount /lyman/data1/7dt
sudo mount -t nfs -o ro,soft,timeo=30,retrans=3 147.46.45.48:/lyman/data1/7dt /lyman/data1/7dt
```

(and the same options in `/etc/fstab`, if the mount was added there)

## Order

1 and 2 first: without the configuration the apps have nothing to start from.
3 last, once they are confirmed running on 127.0.0.1.

## State of play

Done, and needing no privilege: Miniconda 23.11 in `~/miniconda3` (the newest
build that still supports glibc 2.17), the `7dtcalc` environment on Python
3.11, and every dependency installed from wheels — see
`7DT_calculator/constraints-glibc217.txt` for why the versions are pinned.

`pytest tests -q` on this host: **26 passed, 13 failed, and all thirteen
failures are the same missing file**, `/lyman/data1/7dt/configuration/observer.config`.
Nothing else is wrong with the stack here. Step 2 turns them green.
