# Mallorca24-Main-Backend-Service


## Run

1) Create SSL-Certificate: In order to run the backend you need an SSL certificate. There are two options:
   1) (Recommended) Use certbot to create a certificate: 
      1) `sudo apt install certbot openssl`: Install certbot and openssl in order to get a Let's Encrypt SSL Certificate.
      2) `certbot certonly -a standalone -d <your_domain>`: Make sure that port 80 is opened. Certbot will than create a certificate for the provided domain. You can also use your public ip address.
      3) `cd <path>`: In 2) you will get a path in which your keys are stored. Go there.

      4) `openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem -out keystore.p12 -name tomcat -CAfile chain.pem -caname root`: Use openssl to create a PKCS12 certificate from your keys.
   2) Create a self-signed certificate. This might cause certificate errors. You have to turn out certificate validation in your browser to use this method. 
      1) `keytool -genkeypair -alias certificate -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore keystore.p12 -validity 3650`: Creates a self-signed certificate. 
2) Adjust [application.properties](https://github.com/florianfoerg/mallorca24/blob/master/server/mallorca-service/src/main/resources/application.properties): Make sure to set database and TSL properties. 
You can use the following default values if you want to use the default database: 
```
   spring.datasource.url=jdbc:postgresql://localhost:5432/mallorca-db
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   server.port=8443
   server.ssl.enabled=true
   server.ssl.key-store-type=PKCS12
```
Note: you have to set `server.ssl.key-store` and `server.ssl.key-store-password` individually.
3) `./run.sh`: Creates default database and runs Spring application in Docker container. Note: Opens port 8443.