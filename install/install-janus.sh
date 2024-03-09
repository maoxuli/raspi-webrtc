#!/usr/bin/env bash 
set -x 

## libnice 0.1.18 from source code 
git clone --depth 1 --branch 0.1.18 https://gitlab.freedesktop.org/libnice/libnice.git
cd libnice 
meson --prefix=/usr build && ninja -C build && sudo ninja -C build install
cd ..
rm -rf libnice 

## libsrtp2 from source code 
wget https://github.com/cisco/libsrtp/archive/v2.2.0.tar.gz
tar xfv v2.2.0.tar.gz
cd libsrtp-2.2.0
./configure --prefix=/usr --enable-openssl
make shared_library && sudo make install
cd ..
rm -rf v2.2.0.tar.gz libsrtp-2.2.0
