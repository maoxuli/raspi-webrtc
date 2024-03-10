#!/usr/bin/env bash
set -x 

# gst-launch-1.0 -v filesrc location="$HOME/Serenity-HD-DVD-Trailer.mp4" ! qtdemux ! h264parse config-interval=-1 ! v4l2h264dec ! x264enc ! rtph264pay ! udpsink port=5000 host=127.0.0.1
gst-launch-1.0 -v filesrc location="$HOME/Serenity-HD-DVD-Trailer.mp4" ! qtdemux ! h264parse config-interval=-1 ! avdec_h264 ! x264enc ! rtph264pay ! udpsink port=5004 host=127.0.0.1