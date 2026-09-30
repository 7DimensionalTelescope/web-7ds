# Install as /etc/nginx/conf.d/calculators-locations.inc — included from the 443
# server block of 7ds.conf by a single line (deploy/SUDO.md, step 3). The .inc
# extension keeps conf.d/*.conf from loading it as a top-level file.
#
# The four addresses are the ones the Call for Proposals and the Phase 1
# Instructions print: http://7ds.snu.ac.kr/visibility, /exptime, /overhead,
# /tile. Each app runs with --server.baseUrlPath set to that prefix, and
# proxy_pass carries no URI so the path reaches it unchanged.
#
# The documents print the addresses without a trailing slash. The exact-match
# location sends that to the slash form, which is what the prefix location and
# the app's own relative URLs expect.

location = /visibility { return 301 /visibility/; }
location /visibility/ {
    proxy_pass http://127.0.0.1:8509;
    include /etc/nginx/conf.d/calculators-proxy.inc;
}

location = /exptime { return 301 /exptime/; }
location /exptime/ {
    proxy_pass http://127.0.0.1:8510;
    include /etc/nginx/conf.d/calculators-proxy.inc;
}

location = /overhead { return 301 /overhead/; }
location /overhead/ {
    proxy_pass http://127.0.0.1:8511;
    include /etc/nginx/conf.d/calculators-proxy.inc;
}

location = /tile { return 301 /tile/; }
location /tile/ {
    proxy_pass http://127.0.0.1:8512;
    include /etc/nginx/conf.d/calculators-proxy.inc;
}
