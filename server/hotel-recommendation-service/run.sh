#!/bin/bash

# Build the Docker image
docker build -t recommendation-service .

# Run the Docker container
docker run --network=host -d recommendation-service
