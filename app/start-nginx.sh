#!/usr/bin/env bash
set -x 

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NGINX_CONFIG="${CURRENT_DIR}/web/nginx.conf"

nginx -c "${NGINX_CONFIG}"
