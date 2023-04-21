import csv
import mysql.connector
from datetime import datetime


def convert_date(date):
    input_format = '%Y-%m-%dT%H:%M:%S%z'
    output_format = '%Y-%m-%d %H:%M:%S'

    input_time = datetime.strptime(date, input_format)

    return str(input_time.strftime(output_format))


content = open('offers.csv')

# connect to the MySQL database
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="mallorca-db"
)

# create a cursor object to execute SQL queries
mycursor = mydb.cursor()

reader = csv.reader(content, delimiter=',', quotechar='"')

for i in range(7_900_001):
    next(reader)

offer_id = 7_900_001

room = {
    "DOUBLE": 0,
    "APARTMENT": 1,
    "TRIPLE": 2,
    "SINGLE": 3,
    "ACCORDINGDESCRIPTION": 4,
    "STUDIO": 5,
    "SUITE": 6,
    "FAMILY": 7,
    "DELUXE": 8,
    "SUPERIOR": 9,
    "ECONOMY": 10,
    "BUNGALOW": 11,
    "MULTISHARE": 12,
    "TWINROOM": 13,
    "FOURBEDROOM": 14,
    "VILLA": 15,
    "HOLIDAYHOUSE": 16,
    "JUNIORSUITE": 17,
    "DUPLEX": 18
}

airport = {
    "FMO": 0,
    "STR": 1,
    "HAM": 2,
    "LEJ": 3,
    "NUE": 4,
    "CGN": 5,
    "FRA": 6,
    "PAD": 7,
    "BER": 8,
    "FMM": 9,
    "DUS": 10,
    "SCN": 11,
    "MUC": 12,
    "DTM": 13,
    "DRS": 14,
    "BRE": 15,
    "VIE": 16,
    "NRN": 17,
    "FKB": 18,
    "ZRH": 19,
    "BSL": 20,
    "HAJ": 21,
    "AMS": 22,
    "FDH": 23,
    "LBC": 24,
    "HHN": 25,
    "SZG": 26,
    "LUX": 27,
    "PRG": 28,
    "INN": 29,
    "KSF": 30,
    "LNZ": 31,
    "EIN": 32,
    "SXB": 33,
    "BLL": 34,
    "BRU": 35,
    "GRZ": 36,
    "GWT": 37,
    "CRL": 38,
    "CSO": 39,
    "WAW": 40,
    "GVA": 41,
    "ERF": 42,
    "KRK": 43,
    "BRN": 44,
    "RLG": 45, 
    "KLU": 46
}

meal = {
    "NONE": 0,
    "BREAKFAST": 1,
    "ALLINCLUSIVE": 2,
    "HALFBOARD": 3,
    "ALLINCLUSIVEPLUS": 4,
    "HALFBOARDPLUS": 5,
    "FULLBOARD": 6,
    "FULLBOARDPLUS": 7,
    "ACCORDINGDESCRIPTION": 8
}

ocean = {
    "false": False,
    "true": True
}

sql = "INSERT INTO offers (offer_id, count_adults, count_children, inbound_departure_date_time, mealtype, oceanview, outbound_departure_airport, outbound_departure_date_time, price, roomtype, hotel_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

# iterate over each row in the CSV file
for row in reader:
    offer_id += 1
    count_adults = row[3]
    count_children = row[4]
    inbound_departure_date_time = convert_date(row[2])
    outbound_departure_date_time = convert_date(row[1])
    mealtype = meal[row[12]]
    oceanview = ocean[row[13]]
    outbound_departure_airport = airport[row[9]]
    price = row[5]
    roomtype = room[row[14]]
    hotel_id = row[0]

    
    # execute the SQL query with the values from the current row
    mycursor.execute(sql, (offer_id, count_adults, count_children, inbound_departure_date_time,
                     mealtype, oceanview, outbound_departure_airport, outbound_departure_date_time, price, roomtype, hotel_id))
    
    if offer_id % 100000 == 0:
        mydb.commit()

    
# commit the changes to the database
mydb.commit()

# close the database connection
mydb.close()
