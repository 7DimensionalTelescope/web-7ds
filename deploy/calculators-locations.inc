# Install as /etc/nginx/conf.d/calculators-locations.inc — included from the 443
# server block of 7ds.conf by a single line (deploy/SUDO.md, step 3). The .inc
# extension keeps conf.d/*.conf from loading it as a top-level file.


location /calculator/visibility/app/ {
    proxy_pass http://127.0.0.1:8509;
    include /etc/nginx/conf.d/calculators-proxy.inc;
}

location /calculator/exposure/app/ {
    proxy_pass http://127.0.0.1:8510;
    include /etc/nginx/conf.d/calculators-proxy.inc;
}

location /calculator/overhead/app/ {
    proxy_pass http://127.0.0.1:8511;
    include /etc/nginx/conf.d/calculators-proxy.inc;
}

location /calculator/tiles/app/ {
    proxy_pass http://127.0.0.1:8512;
    include /etc/nginx/conf.d/calculators-proxy.inc;
}

