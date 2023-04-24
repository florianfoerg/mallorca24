FROM python:3.9-slim

ENV TZ=Europe/Berlin

WORKDIR /app

COPY requirements.txt requirements.txt

RUN apt-get update && \
    apt-get install -y tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata && \
    pip3 install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python3", "email-server.py"]
