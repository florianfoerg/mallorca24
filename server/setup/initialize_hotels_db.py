import csv
import mysql.connector
import requests
import random

# download the hotels.csv file from the GitHub repository
url = "https://raw.githubusercontent.com/check24-scholarships/holiday-challenge/main/data/hotels.csv"
response = requests.get(url)
content = response.content.decode('utf-8').splitlines()

images = [
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1000&dpr=1",
    "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1000&dpr=1",
    "https://images.pexels.com/photos/453201/pexels-photo-453201.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1000&dpr=1",
    "https://images.pexels.com/photos/1755288/pexels-photo-1755288.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1000&dpr=1",
    "https://images.pexels.com/photos/167533/pexels-photo-167533.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1000&dpr=1",
    "https://images.pexels.com/photos/381541/pexels-photo-381541.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1000&dpr=1",
    "https://images.pexels.com/photos/1638341/pexels-photo-1638341.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1000&dpr=1",
    "https://images.pexels.com/photos/1188473/pexels-photo-1188473.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1000&dpr=1",
    "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1000&dpr=1"
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
    sql = "INSERT INTO hotels (hotel_id, hotel_name, hotel_stars, image, mail, has_pool, pets_allowed, free_wifi, distance_next_airport, distance_next_beach, distance_centre, clicks) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    # execute the SQL query with the values from the current row
    mycursor.execute(sql, (hotel_id, hotel_name, hotel_stars, hotel_image, "mail@hotel.com", random.random() < 0.5, random.random() < 0.3, random.random() < 0.9, random.randint(5, 100), random.randint(200, 10000), random.randint(400, 8000), 0))
    # commit the changes to the database
    mydb.commit()

# close the database connection
mydb.close()
