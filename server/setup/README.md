# Initialize Database

This directory can be used to insert initial values into your database.

## Run

 1) Make sure to run the main-backend `mallorca-service` first.
 2) Insert `offers.csv` file into this directory. If you work on a Linux remote server you can use `sftp` or `wget`.
 3) Make sure that the database connection data within the python scripts works with your database configuration.
 4) Run `./run.sh`. Since the offer-data set is huge, offers will be initialized in the background. This may take several hours.
