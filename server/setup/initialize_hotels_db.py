import csv
import mysql.connector
import requests
import random

# download the hotels.csv file from the GitHub repository
url = "https://raw.githubusercontent.com/check24-scholarships/holiday-challenge/main/data/hotels.csv"
response = requests.get(url)
content = response.content.decode('utf-8').splitlines()

images = [
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/453201/pexels-photo-453201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/261181/pexels-photo-261181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
]

# connect to the MySQL database
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="mallorca-db"
)

# create a cursor object to execute SQL queries
mycursor = mydb.cursor()

reader = csv.reader(content, delimiter=';')

#skip first row
next(reader)

# iterate over each row in the CSV file
for row in reader:
    # extract the values from the current row
    hotel_id = row[0]
    hotel_name = row[1]
    hotel_stars = row[2]
    hotel_image = random.choice(images)
    # construct the SQL query to insert a new tuple into the hotels table
    sql = "INSERT INTO hotel (hotel_id, hotel_name, hotel_stars, image, mail, min_stay_duration) VALUES (%s, %s, %s, %s, %s, %s)"
    # execute the SQL query with the values from the current row
    mycursor.execute(sql, (hotel_id, hotel_name, hotel_stars, hotel_image, "mail@hotel.com", 1))
    # commit the changes to the database
    mydb.commit()

# close the database connection
mydb.close()