import csv
import mysql.connector
import requests
import random

# function to create random latidude in the range of Mallorca
def random_lat():
    return random.uniform(39.56, 39.71)

# function to create random longitude in the range of Mallorca
def random_long():
    return random.uniform(2.55, 3.37)

#function to create random descritiption for hotel in Mallorca
def random_desc(distance_next_airport, distance_next_beach, distance_centre, hotel_stars):
    description = "Welcome to Mallorca! "

    if random.randint(0,1) == 1:
        description += "Nestled on the sunny shores of Mallorca, our hotel offers the perfect blend of relaxation and adventure. With its prime location just a stone's throw from the beach and close proximity to local attractions, our hotel is the ideal base for exploring the island. "

    if random.randint(0,1) == 1:
        description += "Our hotel is located in the heart of the city, close to the beach and the airport. We offer a wide range of services and amenities to ensure that your stay is as comfortable as possible. "

    if random.randint(0,1) == 1:
        description+= "The hotel boasts a range of luxurious amenities, including an outdoor pool, fitness center, and spa, where you can indulge in a range of rejuvenating treatments. Our on-site restaurant serves up delicious local cuisine, and our bar is the perfect spot for a refreshing cocktail after a long day of exploring. "

    if distance_next_airport < 20:
        description += "The nearest airport is only " + str(distance_next_airport) + " km away. "

    if distance_next_beach < 2000:
        description += "The hotel is very close to the beach, you can rent a bike and ride there. "

    if distance_centre < 4000:
        description += "The hotel is located in the city centre, you can walk there in " + str(random.randint(5,10)) + " minutes. "

    if random.randint(0,1) == 1:
        description += "Each of our spacious guest rooms is tastefully appointed with all the modern amenities you need for a comfortable stay, including free Wi-Fi, flat-screen TVs, and plush bedding. Whether you're traveling with family or seeking a romantic getaway, our hotel has something for everyone."

    description += "We would love to welcome you to our " + str(int(float(hotel_stars))) + "-star hotel!"

    return description

    


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
    distance_next_airport = random.randint(5, 100)
    distance_next_beach = random.randint(200, 10000)
    distance_centre = random.randint(400, 8000)

    # construct the SQL query to insert a new tuple into the hotels table
    sql = "INSERT INTO hotels (hotel_id, hotel_name, hotel_stars, image, mail, has_pool, pets_allowed, free_wifi, distance_next_airport, distance_next_beach, distance_centre, clicks, latitude, longitude, description) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    # execute the SQL query with the values from the current row
    mycursor.execute(sql, (hotel_id, hotel_name, hotel_stars, hotel_image, "mail@hotel.com", random.random() < 0.5, random.random() < 0.3, random.random() < 0.9, distance_next_airport, distance_next_beach, distance_centre, 0, random_lat(), random_long(), random_desc(distance_next_beach, distance_next_airport, distance_centre, hotel_stars)))
    # commit the changes to the database
    mydb.commit()

# close the database connection
mydb.close()
