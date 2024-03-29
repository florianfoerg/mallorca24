import psycopg2


# connect to the MySQL database
mydb = psycopg2.connect(
    host="localhost",
    user="postgres",
    password="postgres", #change password before running!
    database="mallorcadb"
)

# create a cursor object to execute SQL queries
mycursor = mydb.cursor()

mycursor.execute('''CREATE TABLE IF NOT EXISTS hotel_recommendations
                                        (id INTEGER PRIMARY KEY,
                                        hotel_id BIGINT references hotels)''')

mycursor.execute('SELECT hotel_id FROM hotels ORDER BY RANDOM() LIMIT 15')
hotel_ids = mycursor.fetchall()

mycursor.execute('DELETE FROM hotel_recommendations')

for i, hotel_id in enumerate(hotel_ids):
    mycursor.execute('INSERT INTO hotel_recommendations (id, hotel_id) VALUES (%s, %s)', (i+1, hotel_id[0]))

mydb.commit()
# close the database connection
mydb.close()
