#!/usr/bin/env bash
set -x 

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# start nginx service
NGINX_CONFIG="${CURRENT_DIR}/nginx/nginx.conf"
nginx -c "${NGINX_CONFIG}"

# start janus
JANUS_CONFIG="${CURRENT_DIR}/janus"
janus -C "${JANUS_CONFIG}/janus.jcfg" -F "${JANUS_CONFIG}"

# clean nginx service
pkill -f nginx
