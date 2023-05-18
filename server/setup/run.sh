#!/bin/bash

# Check if offers.csv file exists in directory
if [ ! -f offers.csv ]; then
    echo "File 'offers.csv' not found in directory"
    exit 1
fi

# Install Python and required packages
sudo apt-get update
sudo apt-get install -y python3 python3-pip
pip3 install psycopg2-binary requests

# Run Python scripts
python3 initialize_hotels_db.py
nohup python3 initialize_offers_db.py &
