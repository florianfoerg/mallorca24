# Mallorca24-Frontend

The frontend is responsible for providing a user interface that the user can interact with. We use a React service for this purpose. 
Docker will automatically create a production build and deploy it on a Nginx server.

## Run

 1) Check that the nginx-configuration in [config](https://github.com/florianfoerg/mallorca24/blob/master/client/frontend/nginx/nginx.conf) is correctly set up for your purpose (if you do not want to use HTTPS you can leave the default values).
 2) Check that the path to the backend path in [App.js](https://github.com/florianfoerg/mallorca24/blob/master/client/frontend/src/App.js) is defined correctly. If you do not want to host your own backend you can just leave the default value.
 3) Run `./run.sh`. Note: This will expose ports 80 and 443. You can now access the frontend at http://localhost and at http://<your_public_ip>.
 4) (Optional) Add HTTPS support: If you want to provide encrypted communication, you need to add an SSL certificate to your Nginx server. The easiest way to do this is as follows:
    1) `docker ps`: Find the container ID running the "frontend" image.
    2) `docker exec -it <container-id> /bin/sh`: Opens the shell of the Docker container.
    3) `apk update & apk add certbot certbot-nginx`: Install Certbot, which can be used to get a Let's Encrypt SSL certificate.
    4) `certbot --nginx`: Follow the setup instructions to get your encrypted frontend. You can than access it at https://localhost and at https://<your_public_ip>.

