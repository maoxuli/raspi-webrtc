# Raspi-WebRTC 

## Install software 

    * ./nginx/install-nginx.sh 
    * ./janus/install-janus.sh 
    * ./camera/install-gstreamer.sh 
    * ./camera/rebuild-rpicam.sh (optional)

## Run in foreground with non-root user (for testing) 

    [Stop systemd services if they are running]

    * ./nginx/start-nginx.sh (stop-nginx.sh)
    * ./janus/start-janus.sh 
    * ./camera/start-rpicam.sh [rpicam-name]
    * ./camera/start-usbcam.sh </dev/video*>

    * http://localhost:8080 

## Install systemd services (to autorun on system startup)

    * ./nginx/install-website.sh 
    * ./janus/install-service.sh 
    * ./camera/install-service.sh 

    * http://localhost[:80]

## Manage systemd service state 

    * sudo systemctl enable <service>
    * sudo systemctl disable <service>
    * sudo systemctl status <service>
    * sudo systemctl start <service>
    * sudo systemctl stop <service>
    * sudo systemctl restart <service>
