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

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/recommendations_cron

# Apply cron job
RUN crontab /etc/cron.d/recommendations_cron

# Copy the rest of the application code to the container
COPY . .

# Start cron service in the foreground
CMD ["cron", "-f"]