# Camera(s) for Live video pipeline

## Install software 

    * install-gstreamer.sh 
    * rebuild-rpicam.sh 

Because of the compatible issues, the libcamera and rpicam-apps may need to be rebuilt from source code. 

## Setup systemd service for camera(s) 

    * install-service.sh 
    * uninstall-service.sh 

## Manage camera service state with sytemd client commands

    * sudo systemctl enable camera0.service 
    * sudo systemctl disable camera0.service 
    * sudo systemctl status camera0.service 
    * sudo systemctl start camera0.service 
    * sudo systemctl stop camera0.service 
    * sudo systemctl restart camera0.service 

If the systemd service is "enabled", the live video pipeline for the camera will be launched with system startup. 
