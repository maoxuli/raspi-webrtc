# lsusb 

pi@raspberrypi:~ $ lsusb
Bus 001 Device 003: ID 0c45:6366 Microdia Webcam Vitade AF

# list-devices

pi@raspberrypi:~ $ v4l2-ctl --list-devices
USB 2.0 Camera: USB Camera (usb-xhci-hcd.0-1):
	/dev/video8
	/dev/video9
	/dev/video10
	/dev/video11
	/dev/media4

# list-formsts-ext for /dev/video8

pi@raspberrypi:~ $ v4l2-ctl -D -d /dev/video8 --list-formats-ext
Driver Info:
	Driver name      : uvcvideo
	Card type        : USB 2.0 Camera: USB Camera
	Bus info         : usb-xhci-hcd.0-1
	Driver version   : 6.1.73
	Capabilities     : 0x84a00001
		Video Capture
		Metadata Capture
		Streaming
		Extended Pix Format
		Device Capabilities
	Device Caps      : 0x04200001
		Video Capture
		Streaming
		Extended Pix Format
Media Driver Info:
	Driver name      : uvcvideo
	Model            : USB 2.0 Camera: USB Camera
	Serial           : SN0001
	Bus info         : usb-xhci-hcd.0-1
	Media version    : 6.1.73
	Hardware revision: 0x00000100 (256)
	Driver version   : 6.1.73
Interface Info:
	ID               : 0x03000002
	Type             : V4L Video
Entity Info:
	ID               : 0x00000001 (1)
	Name             : USB 2.0 Camera: USB Camera
	Function         : V4L2 I/O
	Flags            : default
	Pad 0x0100000d   : 0: Sink
	  Link 0x0200001a: from remote pad 0x1000010 of entity 'Extension 4' (Video Pixel Formatter): Data, Enabled, Immutable
ioctl: VIDIOC_ENUM_FMT
	Type: Video Capture

	[0]: 'MJPG' (Motion-JPEG, compressed)
		Size: Discrete 1920x1080
			Interval: Discrete 0.033s (30.000 fps)
			Interval: Discrete 0.033s (30.000 fps)
		Size: Discrete 1280x720
			Interval: Discrete 0.033s (30.000 fps)
		Size: Discrete 640x480
			Interval: Discrete 0.033s (30.000 fps)
		Size: Discrete 320x240
			Interval: Discrete 0.033s (30.000 fps)
		Size: Discrete 1920x1080
			Interval: Discrete 0.033s (30.000 fps)
			Interval: Discrete 0.033s (30.000 fps)
	[1]: 'YUYV' (YUYV 4:2:2)
		Size: Discrete 640x480
			Interval: Discrete 0.033s (30.000 fps)
			Interval: Discrete 0.033s (30.000 fps)
		Size: Discrete 320x240
			Interval: Discrete 0.033s (30.000 fps)
		Size: Discrete 640x480
			Interval: Discrete 0.033s (30.000 fps)
			Interval: Discrete 0.033s (30.000 fps)
            
# v4l2src caps for /dev/video8

video/x-raw, format=(string)YUY2, width=(int)640, height=(int)480, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 30/1 }; 
video/x-raw, format=(string)YUY2, width=(int)640, height=(int)480, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 30/1 }; 
video/x-raw, format=(string)YUY2, width=(int)320, height=(int)240, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)30/1; 

image/jpeg, width=(int)1920, height=(int)1080, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 30/1 }; 
image/jpeg, width=(int)1920, height=(int)1080, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 30/1 }; 
image/jpeg, width=(int)1280, height=(int)720, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)30/1; 
image/jpeg, width=(int)640, height=(int)480, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)30/1; 
image/jpeg, width=(int)320, height=(int)240, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)30/1

# list-formats-ext for /dev/video10

pi@raspberrypi:~ $ v4l2-ctl -D -d /dev/video10 --list-formats-ext
Driver Info:
	Driver name      : uvcvideo
	Card type        : USB 2.0 Camera: USB Camera
	Bus info         : usb-xhci-hcd.0-1
	Driver version   : 6.1.73
	Capabilities     : 0x84a00001
		Video Capture
		Metadata Capture
		Streaming
		Extended Pix Format
		Device Capabilities
	Device Caps      : 0x04200001
		Video Capture
		Streaming
		Extended Pix Format
Media Driver Info:
	Driver name      : uvcvideo
	Model            : USB 2.0 Camera: USB Camera
	Serial           : SN0001
	Bus info         : usb-xhci-hcd.0-1
	Media version    : 6.1.73
	Hardware revision: 0x00000100 (256)
	Driver version   : 6.1.73
Interface Info:
	ID               : 0x03000008
	Type             : V4L Video
Entity Info:
	ID               : 0x00000007 (7)
	Name             : USB 2.0 Camera: USB Camera
	Function         : V4L2 I/O
	Pad 0x01000011   : 0: Sink
	  Link 0x0200001e: from remote pad 0x1000010 of entity 'Extension 4' (Video Pixel Formatter): Data, Enabled, Immutable
ioctl: VIDIOC_ENUM_FMT
	Type: Video Capture

	[0]: 'H264' (H.264, compressed)
		Size: Discrete 1920x1080
			Interval: Discrete 0.033s (30.000 fps)
			Interval: Discrete 0.033s (30.000 fps)
		Size: Discrete 1280x720
			Interval: Discrete 0.033s (30.000 fps)
		Size: Discrete 640x480
			Interval: Discrete 0.033s (30.000 fps)
		Size: Discrete 640x360
			Interval: Discrete 0.033s (30.000 fps)
		Size: Discrete 1920x1080
			Interval: Discrete 0.033s (30.000 fps)
			Interval: Discrete 0.033s (30.000 fps)


# v4l2src caps for /dev/video10

video/x-h264, stream-format=(string)byte-stream, alignment=(string)au, width=(int)1920, height=(int)1080, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 30/1 }; 
video/x-h264, stream-format=(string)byte-stream, alignment=(string)au, width=(int)1920, height=(int)1080, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 30/1 }; 
video/x-h264, stream-format=(string)byte-stream, alignment=(string)au, width=(int)1280, height=(int)720, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)30/1; 
video/x-h264, stream-format=(string)byte-stream, alignment=(string)au, width=(int)640, height=(int)480, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)30/1; 
video/x-h264, stream-format=(string)byte-stream, alignment=(string)au, width=(int)640, height=(int)360, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)30/1
