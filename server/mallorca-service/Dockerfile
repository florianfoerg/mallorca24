# Use a base image with JDK and Gradle pre-installed
FROM gradle:jdk17

# Set the working directory to /app
WORKDIR /app

# Copy the project files into the container
COPY . .

# Install all dependencies with Gradle
RUN gradle dependencies

# Build the project with Gradle
RUN gradle clean build

# Check if the jar file exists
RUN test -f "build/libs/mallorca-service-0.0.1-SNAPSHOT.jar"

# Expose the default port used by the Spring application
EXPOSE 8433

# Start the Spring application
CMD ["java", "-jar", "build/libs/mallorca-service-0.0.1-SNAPSHOT.jar"]