#!/usr/bin/env bash
set -x 

# start nginx processes started by non-root user
pkill -f nginx 
