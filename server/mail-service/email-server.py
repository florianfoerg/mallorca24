from flask import Flask, json, request
from email.message import EmailMessage
import ssl
import smtplib
import gevent.pywsgi
from flask_cors import CORS
from dotenv import load_dotenv
import os

api = Flask(__name__)
CORS(api, resources={r"/*": {"origins": "http://localhost:8080"}})

#the global variables are retrieved from the .env file
global EMAIL_SENDER
global EMAIL_PASSWORD

import os
from datetime import datetime
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

def create_booking_success_pdf(booking_id, customer_mail, hotel_name, date, price):
    # set up PDF document
    pdf_filename = f"order_success_{booking_id}.pdf"
    doc_title = f"Order Success - {booking_id}"
    document = canvas.Canvas(pdf_filename, pagesize=letter)
    document.setTitle(doc_title)

    # set up text styles
    title_style = document.beginText()
    title_style.setFont("Helvetica-Bold", 18)
    title_style.setTextOrigin(document._pagesize[0]/2 - 100, 750)
    title_style.textLines(stuff='''Booking confirmation''')

    normal_style = document.beginText()
    normal_style.setFont("Helvetica", 12)
    normal_style.setTextOrigin(50, 700)
    normal_style.textLines(stuff=f'''
    Order Date: {date}h
        Customer Mail: {customer_mail}



    Dear customer,

    Your booking id is {booking_id}.
 
    Hotel: {hotel_name}
    Total: {price:.2f},-€




    
    Thank you for your order!

    If you have any questions, please contact us.
    
    Best regards,
    The MALLORCA24 Team
    
    ------------------------------------------------------------
    This is an automatically generated document.
    https://mallorca24.com/imprint''')

    document.drawText(title_style)
    document.drawText(normal_style)


    # save PDF and return filename
    document.save()
    return os.path.abspath(pdf_filename)


def send_mail(body, subject, to):
    em = EmailMessage()
    em["From"] = EMAIL_SENDER
    em["To"] = to
    em["Subject"] = subject

    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
        smtp.login(EMAIL_SENDER, EMAIL_PASSWORD)
        smtp.sendmail(EMAIL_SENDER, to, em.as_string())


def send_mail_with_attachment(body, subject, to, attachment):
    em = EmailMessage()
    em["From"] = EMAIL_SENDER
    em["To"] = to
    em["Subject"] = subject

    em.set_content(body)

    with open(attachment, "rb") as f:
        file_data = f.read()
        file_name = f.name

    em.add_attachment(file_data, maintype="application", subtype="octet-stream", filename=file_name)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
        smtp.login(EMAIL_SENDER, EMAIL_PASSWORD)
        smtp.sendmail(EMAIL_SENDER, to, em.as_string())

def send_mail_hotel_success(booking_id, date_departure, date_arrival, hotel_name, price, to, room_type):
    body = f"""
    Dear {hotel_name}-Team,

    Good news! You have received a new booking. 

    The booking id is {booking_id}.

    
    The customer will be staying at your hotel from {date_departure[2]}.{date_departure[1]}.{date_departure[0]} to {date_arrival[2]}.{date_arrival[1]}.{date_arrival[0]}.
    The customer will be staying in a {room_type} room and will pay {price:.2f}€.


    We deleted the corresponding offer from our website.


    If you have any questions, please contact us at support@mallorca24.de. Remember to include your booking id in the subject.
    Thank you for your cooperation and trust in our service.

    Best regards,
    The MALLORCA24 Team

    ------------------------------------------------------------
    This is an automatically generated email. Please do not reply.
    https://mallorca24.com/imprint

    """

    subject = f"New booking: {booking_id}"

    send_mail(body, subject, to)


def send_mail_customer_success(booking_id, date_departure, date_arrival, hotel_name, price, to):
    body = f"""
    Dear customer,

    Thank you for booking with us. Your booking id is {booking_id}.
    You will be staying at {hotel_name} from {date_departure[2]}.{date_departure[1]}.{date_departure[0]} to {date_arrival[2]}.{date_arrival[1]}.{date_arrival[0]}.



    We hope you enjoy your stay.

    If you have any questions, please contact us at info@mallorca24.com. Remember to include your booking id in the subject.

    Best regards,
    The MALLORCA24 Team

    ------------------------------------------------------------
    This is an automatically generated email. Please do not reply.
    https://mallorca24.com/imprint

    """

    subject = f"Booking successful: {booking_id}"


    send_mail_with_attachment(body, subject, to, create_booking_success_pdf(booking_id, to, hotel_name, datetime.now().strftime("%d.%m.%Y %H:%M"), price))


@api.route("/emails/success-customer", methods=["POST"])
def send_email_success_customer():
    data = request.json

    send_mail_customer_success(data["bookingId"], data["dateDeparture"], data["dateArrival"], data["hotelName"], data["price"], data["to"])

    pass
    return json.dumps({"success": True, "message": "Email sent successfully"}), 200, {"ContentType": "application/json"}



@api.route("/emails/success-hotel", methods=["POST"])
def send_email_success_hotel():
    data = request.json

    # deactivated for preventing spam
    #send_mail_hotel_success(data["bookingId"], data["dateDeparture"], data["dateArrival"], data["hotelName"], data["price"], data["to"], data["roomType"])

    pass
    return json.dumps({"success": True, "message": "Email sent successfully"}), 200, {"ContentType": "application/json"}


if __name__ == "__main__":
    load_dotenv()

    EMAIL_SENDER = os.getenv("EMAIL_SENDER")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

    api_server = gevent.pywsgi.WSGIServer(("0.0.0.0", 5000), api)
    api_server.serve_forever()
