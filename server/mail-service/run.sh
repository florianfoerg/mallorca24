#!/bin/bash

# Read the variables
email_sender="$EMAIL_SENDER"
email_password="$EMAIL_PASSWORD"

# Sanity checks for the variables
if [[ -z "$email_sender" ]]; then
  echo "ERROR: EMAIL_SENDER is not set or is empty"
  exit 1
fi

if [[ -z "$email_password" ]]; then
  echo "ERROR: EMAIL_PASSWORD is not set or is empty"
  exit 1
fi

# Create the .env file with the variables
echo "EMAIL_SENDER=$email_sender" > .env
echo "EMAIL_PASSWORD=$email_password" >> .env

# Build the Docker image
docker build -t mail-server .

# Run the Docker container
docker run -p 5000:5000 -d mail-server
