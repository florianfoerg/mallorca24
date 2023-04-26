#!/bin/bash

# Remove old versions of Docker and update apt
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update

# Install necessary packages
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg

# Create keyrings directory and add Docker GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository to sources.list.d and update apt
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# Install Docker and related packages
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Run a test container
sudo docker run hello-world

# Success message
echo "DOCKER SETUP COMPLETED!"
