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

# skip first row
next(reader)

offer_id = 0

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
    "HAM": 3,
    "LEJ": 4,
    "NUE": 5,
    "CGN": 6,
    "FRA": 7,
    "PAD": 8,
    "BER": 9,
    "FMM": 10,
    "DUS": 11,
    "SCN": 12,
    "MUC": 13,
    "DTM": 14,
    "DRS": 15,
    "BRE": 16,
    "VIE": 17,
    "NRN": 18,
    "FKB": 19,
    "ZRH": 20,
    "BSL": 21,
    "HAJ": 22,
    "AMS": 23,
    "FDH": 24,
    "LBC": 25,
    "HHN": 26,
    "SZG": 27,
    "LUX": 28,
    "PRG": 29,
    "INN": 30,
    "KSF": 31,
    "LNZ": 32,
    "EIN": 33,
    "SXB": 34,
    "BLL": 35,
    "BRU": 36,
    "GRZ": 37,
    "GWT": 38,
    "CRL": 39,
    "CSO": 40,
    "WAW": 41,
    "GVA": 42,
    "ERF": 43,
    "KRK": 44,
    "BRN": 45,
    "RLG": 46,
    "KLU": 47
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

sql = "INSERT INTO offer (offer_id, count_adults, count_children, inbound_arrival_date_time, mealtype, oceanview, outbound_departure_airport, outbound_departure_date_time, price, roomtype, hotel_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

# iterate over each row in the CSV file
for row in reader:
    offer_id += 1
    count_adults = row[3]
    count_children = row[4]
    inbound_arrival_date_time = convert_date(row[8])
    outbound_departure_date_time = convert_date(row[1])
    mealtype = meal[row[12]]
    oceanview = ocean[row[13]]
    outbound_departure_airport = airport[row[9]]
    price = row[5]
    roomtype = room[row[14]]
    hotel_id = row[0]

    
    # execute the SQL query with the values from the current row
    mycursor.execute(sql, (offer_id, count_adults, count_children, inbound_arrival_date_time,
                     mealtype, oceanview, outbound_departure_airport, outbound_departure_date_time, price, roomtype, hotel_id))
    
    if offer_id % 1000 == 0:
        mydb.commit()

    
# commit the changes to the database
mydb.commit()

# close the database connection
mydb.close()
