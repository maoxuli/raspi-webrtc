#!/usr/bin/env bash
set -x 

gst-launch-1.0 -v filesrc location="$HOME/Serenity-HD-DVD-Trailer.mp4" ! qtdemux ! h264parse config-interval=-1 ! rtph264pay ! udpsink port=5000 host=127.0.0.1
