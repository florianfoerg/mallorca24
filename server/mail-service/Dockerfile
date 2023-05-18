FROM python:3.10-slim

ENV TZ=Europe/Berlin

WORKDIR /app

COPY requirements.txt requirements.txt

RUN apt-get update && \
    apt-get install -y tzdata libcairo2-dev gcc && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata && \
    pip3 install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python3", "email-server.py"]
