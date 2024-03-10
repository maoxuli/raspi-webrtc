#!/usr/bin/env bash 
set -x 

sudo apt-get update && sudo apt-get install -y \
    autogen \
    autoconf \
    automake \
    libtool \
    pkg-config \
    libconfig-dev \
    libssl-dev \
    libjansson-dev \
    libmicrohttpd-dev \
    libcurl4 \
    libcurl4-openssl-dev \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/* 

# ## libnice 0.1.18 from source code 
# git clone --depth 1 --branch 0.1.18 https://gitlab.freedesktop.org/libnice/libnice.git
# cd libnice 
# meson --prefix=/usr build && ninja -C build && sudo ninja -C build install
# cd ..
# rm -rf libnice 

# ## libsrtp2 from source code 
# wget https://github.com/cisco/libsrtp/archive/v2.2.0.tar.gz
# tar xfv v2.2.0.tar.gz
# cd libsrtp-2.2.0
# ./configure --prefix=/usr --enable-openssl && make shared_library && sudo make install
# cd ..
# rm -rf v2.2.0.tar.gz libsrtp-2.2.0

## janus from source code 
git clone --depth 1 --branch v1.2.1 https://github.com/meetecho/janus-gateway.git
cd janus-gateway
./autogen.sh && ./configure && make && sudo make install && sudo make configs 
cd ..
rm -rf janus-gateway
