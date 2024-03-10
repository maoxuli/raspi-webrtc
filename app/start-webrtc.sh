#!/usr/bin/env bash
set -x 

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

JANUS_CONFIG="${CURRENT_DIR}/janus"
janus -C "${JANUS_CONFIG}/janus.jcfg" -F "${JANUS_CONFIG}"

NGINX_CONFIG="${CURRENT_DIR}/web/nginx.conf"
nginx -c "${NGINX_CONFIG}"
