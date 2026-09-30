# Install as /etc/nginx/conf.d/calculators-proxy.inc
#
# The .inc extension matters: conf.d is loaded with `include conf.d/*.conf`, so
# this file is only read where a location block includes it by name.

proxy_http_version 1.1;
proxy_set_header Upgrade            $http_upgrade;
proxy_set_header Connection         $connection_upgrade;
proxy_set_header Host               $host;
proxy_set_header X-Real-IP          $remote_addr;
proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto  $scheme;

# Streamlit streams; buffering makes the UI arrive in jerks and can stall the
# websocket entirely.
proxy_buffering off;
proxy_read_timeout 86400s;
proxy_send_timeout 86400s;
