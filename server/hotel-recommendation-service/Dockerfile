FROM python:3.9-slim-buster

WORKDIR /app

# Copy requirements file to container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install cron package
RUN apt-get update && apt-get -y install cron

# Copy cron file to container
COPY recommendations_cron /etc/cron.d/recommendations_cron

COPY . .

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/recommendations_cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Start the cron daemon and log the output
CMD cron && tail -f /var/log/cron.log