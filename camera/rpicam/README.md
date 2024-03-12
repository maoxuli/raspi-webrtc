# Raspi Camera 

## About raspi camera module 3 

Please see techincal details for this camera in "rpicam-v3.md". 

This camera outputs raw image only. 

The resolution for raw image capture will be 2304x1296@30. 

## GStreamer image capture 

The gstreamer plugin "libcamerasrc" is used to capture raw image from raspi camera. 

The "libcamerasrc" element does not support common settings for camera or capture, e.g. the brightness and contrast, so "libcamera" or "v4l2" tools need to be used if settings are required.   

Some gstreamer pipeline(s) are included in "gst-test.sh", which could be used for camera testing in command line. 
