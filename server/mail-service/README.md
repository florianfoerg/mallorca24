# Mail Service

This Python server can be used to send emails. 

Endpoints:
- `/emails/success-customer`: Sends a success email to the customer. The body should contain "bookingId", "dateDeparture", "dateArrival", "hotelName", "price", and "to". "to" refers to the customer's email address.
- `/emails/success-hotel`: By default, this endpoint is turned off. Activate it on line 187. It can be used to send booking information to the hotel's email address. The body should contain "bookingId", "dateDeparture", "dateArrival", "hotelName", "price", "to", and "roomType". "to" refers to the hotel's email address.

## Run

Before running the server, you need to create a suitable Gmail account that can be used to send emails automatically. Therefore, set up a Gmail account with two-factor authentication turned on and an App Password. You can find more information [here](https://support.google.com/accounts/answer/185833?hl=en).

Then run: `./run.sh EMAIL_SENDER=<your_sender_mail> EMAIL_PASSWORD=<corresponding_password>`.

If you do not run the backend and the mail-service on the same host server, you have to open port 5000 and change `URL_MAIL_SERVER` in [BookingService](https://github.com/florianfoerg/mallorca24/blob/master/server/mallorca-service/src/main/java/de/florian/mallorcaservice/bookings/BookingService.java).
