#!/bin/bash

# Build the Docker image
docker build -t frontend .

# Run the Docker container
docker run -p 80:80 -p 443:443 -d frontend

# Open required ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
