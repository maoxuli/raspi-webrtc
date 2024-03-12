#!/usr/bin/env bash 
set -x 

# You may copy the gst command and run in terminal. 
# If you would like to run this script file, please comment all commands other than the one you would like to run.   

export GST_DEBUG=3

gst-launch-1.0 -v filesrc location="$HOME/Serenity-HD-DVD-Trailer.mp4" ! decodebin ! videoconvert ! videoscale ! autovideosink


# gst-launch-1.0 -v udpsrc port=5000 ! "application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtph264depay ! h264parse ! avdec_h264 ! videoconvert ! autovideosink
gst-launch-1.0 -v udpsrc port=5000 ! "application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtph264depay ! h264parse ! decodebin ! videoconvert ! autovideosink sync=false



# gst-launch-1.0 -v filesrc location="$HOME/Serenity-HD-DVD-Trailer.mp4" ! qtdemux ! h264parse ! rtph264pay ! udpsink udpsink port=5000 host=192.168.1.97
gst-launch-1.0 -v filesrc location="$HOME/Serenity-HD-DVD-Trailer.mp4" ! qtdemux ! h264parse config-interval=-1 ! rtph264pay ! udpsink port=5000 host=192.168.1.97


# gst-launch-1.0 -v filesrc location="$HOME/Serenity-HD-DVD-Trailer.mp4" ! qtdemux ! h264parse config-interval=-1 ! v4l2h264dec ! x264enc ! rtph264pay ! udpsink port=5000 host=192.168.1.97
gst-launch-1.0 -v filesrc location="$HOME/Serenity-HD-DVD-Trailer.mp4" ! qtdemux ! h264parse config-interval=-1 ! avdec_h264 ! x264enc ! rtph264pay ! udpsink port=5000 host=192.168.1.97
