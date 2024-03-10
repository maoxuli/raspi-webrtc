#!/usr/bin/env bash
set -x 

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# restart nginx service
NGINX_CONFIG="${CURRENT_DIR}/nginx/nginx.conf"
sudo systemctl stop nginx.service 
sudo nginx -c "${NGINX_CONFIG}"

# start janus
JANUS_CONFIG="${CURRENT_DIR}/janus"
janus -C "${JANUS_CONFIG}/janus.jcfg" -F "${JANUS_CONFIG}"
