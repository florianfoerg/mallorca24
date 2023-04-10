import mysql.connector


# connect to the MySQL database
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="mallorca-db"
)

# create a cursor object to execute SQL queries
mycursor = mydb.cursor()

mycursor.execute('''CREATE TABLE IF NOT EXISTS hotel_recommendations
                                        (id INTEGER PRIMARY KEY,
                                        hotel_id BIGINT references hotels)''')

mycursor.execute('SELECT hotel_id FROM hotels ORDER BY RAND() LIMIT 15')
hotel_ids = mycursor.fetchall()

mycursor.execute('DELETE FROM hotel_recommendations')

for i, hotel_id in enumerate(hotel_ids):
    mycursor.execute('INSERT INTO hotel_recommendations (id, hotel_id) VALUES (%s, %s)', (i+1, hotel_id[0]))

mydb.commit()
# close the database connection
mydb.close()
