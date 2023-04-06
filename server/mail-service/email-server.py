from flask import Flask, json, request
from email.message import EmailMessage
import ssl
import smtplib
import gevent.pywsgi
from flask_cors import CORS
from dotenv import load_dotenv
import os

api = Flask(__name__)
CORS(api, resources={r"/*": {"origins": "http://localhost:3000"}})

#the global variables are retrieved from the .env file
global EMAIL_SENDER
global EMAIL_PASSWORD


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


@api.route("/emails", methods=["POST"])
def send_email():
    data = request.json
    send_mail(data["body"], data["subject"], data["to"])

    pass
    return json.dumps({"success": True, "message": "Email sent successfully"}), 200, {"ContentType": "application/json"}


if __name__ == "__main__":
    load_dotenv()

    EMAIL_SENDER = os.getenv("EMAIL_SENDER")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

    api_server = gevent.pywsgi.WSGIServer(("0.0.0.0", 5000), api)
    api_server.serve_forever()
