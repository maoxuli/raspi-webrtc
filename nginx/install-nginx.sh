#!/usr/bin/env bash 
set -x 

sudo apt-get update && sudo apt-get install -y \
    nginx \
&& sudo apt-get clean \
&& sudo rm -rf /var/lib/apt/lists/* 
