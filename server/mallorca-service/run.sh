#!/bin/bash

# Install PostgreSQL
sudo apt-get update
sudo apt-get install -y postgresql

# Create the database and user
sudo -u postgres psql -c "CREATE USER postgres WITH PASSWORD 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE mallorcadb OWNER postgres;"

# Build the Docker image
docker build -t backend .

ufw allow 8443/tcp

# Run the Docker container
docker run -p 8443:8443 --network=host -d backend
