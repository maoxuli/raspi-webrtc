#!/usr/bin/env bash
set -x 

# start nginx with non-root user, with local config and wetsite for testing 
CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NGINX_CONFIG="${CURRENT_DIR}/nginx.conf"
WEBSITE_ROOT="${CURRENT_DIR}/web"
nginx -c "${NGINX_CONFIG}" -p "${WEBSITE_ROOT}"
