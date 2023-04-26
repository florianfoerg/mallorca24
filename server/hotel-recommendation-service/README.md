# Recommendations

This directory provides code to run a Python script in a 12-hour cycle in order to select random hotel recommendations.

## Run

1. Make sure to run the main backend `mallorca-service` first.
2. Ensure that the database connection data within the Python script works with your database configuration.
3. Run `./run.sh`. This will set up a Docker container that runs `hotel-recommendations.py` every 12 hours.
4. (Optional) If you want an immediate update of recommendations, make sure that Python and `psycopg2-binary` are installed. Then run `python3 hotel-recommendations.py`.
