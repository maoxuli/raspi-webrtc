#!/usr/bin/env bash
set -x 

gst-launch-1.0 -v filesrc location="/home/mli@novateur.com/Serenity-HD-DVD-Trailer.mp4" ! qtdemux ! decodebin ! videoconvert ! autovideosink 