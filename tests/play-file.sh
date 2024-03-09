#!/usr/bin/env bash
set -x 

gst-launch-1.0 -v filesrc location="$HOME/Serenity-HD-DVD-Trailer.mp4" ! decodebin ! videoconvert ! videoscale ! autovideosink
