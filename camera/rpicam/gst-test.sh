#!/usr/bin/env bash 
set -x 

# You may copy the gst command and run in terminal. 
# If you would like to run this script file, please comment all commands other than the one you would like to run.   

export GST_DEBUG=libcamerasrc:8 

export DATA="<?xml version=\"1.0\"?><opencv_storage><cameraMatrix type_id=\"opencv-matrix\"><rows>3</rows><cols>3</cols><dt>f</dt><data>903.8 0. 450.0 0. 909.5 400.0 0. 0. 1.</data></cameraMatrix><distCoeffs type_id=\"opencv-matrix\"><rows>5</rows><cols>1</cols><dt>d</dt><data>0.381 0.786 0. 0. 0.</data></distCoeffs></opencv_storage>"

gst-launch-1.0 -v libcamerasrc camera-name="/base/axi/pcie\@120000/rp1/i2c\@88000/imx708\@1a" ! "video/x-raw, format=(string)BGRx, width=(int)2304, height=(int)1296, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)30/1" ! videocrop left=702 top=248 right=702 bottom=248 ! gdkpixbufoverlay location="/home/pi/overlay_black-on-transparent.png" offset-x=50 offset-y=0 ! jpegenc ! rtpjpegpay ! udpsink host=192.168.1.97 port=5000
gst-launch-1.0 -v libcamerasrc camera-name="/base/axi/pcie\@120000/rp1/i2c\@88000/imx708\@1a" ! "video/x-raw, format=(string)BGRx, width=(int)2304, height=(int)1296, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)30/1" ! videocrop left=702 top=248 right=702 bottom=248 ! cameraundistort settings="$DATA" ! gdkpixbufoverlay location="/home/pi/overlay_black-on-transparent.png" offset-x=50 offset-y=0 ! videoconvert ! "video/x-raw, format=(string)I420" ! jpegenc ! rtpjpegpay ! udpsink host=192.168.1.97 port=5000

gst-launch-1.0 -v libcamerasrc camera-name="/base/axi/pcie\@120000/rp1/i2c\@88000/imx708\@1a" ! "video/x-raw, format=(string)BGRx, width=(int)2304, height=(int)1296, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)30/1" ! videocrop left=510 top=140 right=510 bottom=140 ! gdkpixbufoverlay location="/home/pi/overlay_black-on-transparent.png" offset-x=50 offset-y=0 ! jpegenc ! rtpjpegpay ! udpsink host=192.168.1.97 port=5000


# YUYV 4:2:2 ! h264enc ! RTP ! UDP  
# Set the host IP where you will receive and play, e.g. the Raspberry PI or another computer in the same network  
gst-launch-1.0 -v libcamerasrc camera-name="/base/axi/pcie\@120000/rp1/i2c\@88000/imx708\@1a" ! "video/x-raw, format=(string)BGRx, width=(int)2304, height=(int)1296, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)56/1" ! videoconvert ! x264enc ! rtph264pay ! udpsink host=192.168.1.97 port=5000

# UDP ! RTP ! h264dec ! Play 
# Run in terminal of Raspberry PI (if monitor is connected) or another computer in the same network 
# gst-launch-1.0 -v udpsrc port=5000 ! "application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtph264depay ! h264parse ! avdec_h264 ! videoconvert ! autovideosink sync=false
gst-launch-1.0 -v udpsrc port=5000 ! "application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtph264depay ! h264parse ! decodebin ! videoconvert ! autovideosink sync=false
