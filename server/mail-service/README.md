# Mail Service

This Python server can be used to send emails. 

Endpoints:
- **POST** `/emails/success-customer`:  
  Endpoint for sending a success email to the customer.  
  Request JSON parameters:
    - `bookingId` (string)
    - `dateDeparture` (string)
    - `dateArrival` (string)
    - `hotelName` (string)
    - `price` (string)
    - `to` (string)

- **POST** `/emails/success-hotel`:  
  Endpoint for sending a success email to the hotel.  
  Request JSON parameters:
    - `bookingId` (string)
    - `dateDeparture` (string)
    - `dateArrival` (string)
    - `hotelName` (string)
    - `price` (string)
    - `to` (string)
    - `roomType` (string)

## Run

Before running the server, you need to create a suitable Gmail account that can be used to send emails automatically. Therefore, set up a Gmail account with two-factor authentication turned on and an App Password. You can find more information [here](https://support.google.com/accounts/answer/185833?hl=en).

Then run: `./run.sh EMAIL_SENDER=<your_sender_mail> EMAIL_PASSWORD=<corresponding_password>`.

If you do not run the backend and the mail-service on the same host server, you have to open port 5000 and change `URL_MAIL_SERVER` in [BookingService](https://github.com/florianfoerg/mallorca24/blob/master/server/mallorca-service/src/main/java/de/florian/mallorcaservice/bookings/BookingService.java).
