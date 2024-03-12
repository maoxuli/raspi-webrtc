# Janus Gateway for Video Streaming 

## Install Janus Gateway software 

    * install-janus.sh 

Build Janus and dependencies from source code, and installed in default location in "/usr/local".
The default configuration files are in "/usr/local/etc/janus". 
The library files are in "/usr/local/lib/janus".
The executable files are in "/usr/local/bin". 

## Setup systemd service for Janus Gateway 

    * install-service.sh 
    * uninstall-service.sh 

The install script will copy the override configurations in "./etc/janus" to "/etc/janus". 
The systemd service will launch janus with override configurations in "/etc/janus". 

## Manage Janus Gateway service state with sytemd client commands

    * sudo systemctl enable janus.service 
    * sudo systemctl disable janus.service 
    * sudo systemctl status janus.service 
    * sudo systemctl start janus.service 
    * sudo systemctl stop janus.service 
    * sudo systemctl restart janus.service 

If the systemd service is "enabled", the janus will be launched with system startup. 

## Run Janus Gateway service with local config for testing 

    * sudo systemctl stop janus.service 
    * start-janus.sh 

This script runs janus with override configurations in local folder "./etc/janus", mostly for debugging and testing. 

## Override configurations 

    * janus.plugin.streaming.jcfg 

Override configuration for live video streaming from RTP stream, with highlight settings as below: 

    rtp-sample: {
        type = "rtp"
        id = 1
        #audio = true
        #audioport = 5002
        #audiopt = 111
        #audiocodec = "opus"
        video = true
        videoport = 5004
        videopt = 96
        videortpmap = "H264/90000"
        videofmtp = "profile-level-id=42e01f;packetization-mode=1"
    }
