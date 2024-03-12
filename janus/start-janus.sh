#!/usr/bin/env bash
set -x 

# start Janus Gateway with local config for testing 

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JANUS_CONFIG="${CURRENT_DIR}/etc/janus"
janus -C "${JANUS_CONFIG}/janus.jcfg" -F "${JANUS_CONFIG}"
