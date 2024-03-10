#!/usr/bin/env bash
set -x 

SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="${SCRIPTS_DIR}/janus"

janus -C "${CONFIG_DIR}/janus.jcfg" -F "${CONFIG_DIR}"
