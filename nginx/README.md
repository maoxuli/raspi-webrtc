# Nginx web server for WebRTC video streaming 

## Install Nginx software 

    * install-nginx.sh 

The default configuration file is "/etc/nginx/nginx.conf". 
The executable files are installed in "/usr/sbin".
The default website root is "/usr/share/nginx", unless it is set with configuration file or command line argument. 

The systemd service for Nginx had been setup with the installation. 
The Nginx systemd service will use the default configuration file "/etc/nginx/nginx.conf". 

## Manage Nginx service state with sytemd client commands

    * sudo systemctl enable nginx.service 
    * sudo systemctl disable nginx.service 
    * sudo systemctl status nginx.service 
    * sudo systemctl start nginx.service 
    * sudo systemctl stop nginx.service 
    * sudo systemctl restart nginx.service 

If the systemd service is "enabled", the nginx will be launched with system startup. 

## Setup website for WebRTC video streaming 

    * install-website.sh 
    * uninstall-website.sh 

The default configuration file used by nginx service is "/etc/nginx/nginx.conf".
So the install script will copy the override configuration file "./etc/nginx/nginx.conf" to "/etc/nginx/nginx.conf".

The website root location is "/usr/share/niginx", by default or set by override configuration. 
So the install script will copy local website "./web/html" to "/usr/share/nginx/html". 

Highlight of override configuration: 

    http {
        server {
            root /usr/share/nginx;
            listen 80;
            server_name localhost;
        }
    }

## Run Nginx with local config and website for testing 

    * start-nginx.sh 
    * stop-nginx.sh 

The start script runs another nginx instance with non-root user, mostly for debugging and testing. 
The new nginx instance uses override configuration file "./nginx.conf" and local website "./web/html".

Highlight of override configuration: 

    pid /home/pi/nginx/nginx.pid;
    error_log /home/pi/nginx/error.log;
    http {
        access_log /home/pi/nginx/access.log;
        server {
            listen 8080;
            server_name localhost;
        }
    }
