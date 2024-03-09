#!/usr/bin/env bash 
set -x 

## libnice 0.1.18 from source code 
git clone --depth 1 --branch 0.1.18 https://gitlab.freedesktop.org/libnice/libnice.git
cd libnice 
meson --prefix=/usr build && ninja -C build && sudo ninja -C build install
