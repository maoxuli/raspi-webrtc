# USB Camera(s)

## About the ELP 4K HD camera 

Please see technical details for this camera in "usbcam-elp-4k.md". 

This camera outputs raw image or pre-compressed JPEG image. 

Raw image capture is designed for applications that needs local image processing, the resolution is high but frame rate is low, typically 3840x2160@1 or 1920x1080@3. 

JPEG image capture is designed for applications that does not do local image processing (e.g. recording or streaming), both resolution and frame rate are high, typically 3840x2160@30 or 1920x1080@30.  

This application needs to do local image processing (e.g. rotation, cropping, warping, overlay), so raw image capture is the first option. 

If high frame rate is required, e.g. 30 fps for 1920x1080, then the only choice is to capture JPEG image, and then decode the image before processing. The resource usage and performance need to be evaluated. 

## About Arducam 1080p camera 

Please see technical details for this camera in "usbcam-arducam-1080p.md". 

This camera outputs raw image, pre-compressed JPEG image, or pre-compressed H264 video. 

JPEG image and H264 video support resolution up to 1920x1080@30. 

Raw image supports resoltuion up to 640x480@30. 

If high resolution is required, e.g. 1920x1080 at 30 fps, then the only choice is to capture JPEG image, and then decode the image before processing. The resource usage and performance need to be evaluated. 

## GStreamer image/video capture 

The gstreamer plugin "v4l2src" is used to capture image/video from USB camera, which supports capture of raw image, JPEG image, and H264 video. 

The "v4l2src" element supports some common settings on the camera or capture, e.g. the brightness and contrast. 

Some gstreamer pipeline(s) are included in "gst-test.sh", which could be used for camera testing in command line. 
