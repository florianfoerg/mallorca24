# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Add crontab file in the cron directory
ADD crontab /etc/cron.d/myscript-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/myscript-cron

# Apply cron job
RUN crontab /etc/cron.d/myscript-cron

# Set the timezone
ENV TZ=Europe/Madrid
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Run the command on container startup
CMD ["cron", "-f"]
