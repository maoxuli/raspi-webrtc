#!/usr/bin/env bash
set -x 

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# start nginx service
NGINX_ROOT="${CURRENT_DIR}/nginx"
mkdir -p "/home/pi/nginx"
nginx -c "${NGINX_ROOT}/nginx.conf" -p "${NGINX_ROOT}"

# start janus
JANUS_CONFIG="${CURRENT_DIR}/janus"
janus -C "${JANUS_CONFIG}/janus.jcfg" -F "${JANUS_CONFIG}"

# clean nginx service
pkill -f nginx
