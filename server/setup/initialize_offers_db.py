import csv
import psycopg2
from datetime import datetime


def convert_date(date):
    input_format = '%Y-%m-%dT%H:%M:%S%z'
    output_format = '%Y-%m-%d %H:%M:%S'

    input_time = datetime.strptime(date, input_format)

    return str(input_time.strftime(output_format))


content = open('offers.csv')

# connect to the MySQL database
mydb = psycopg2.connect(
    host="localhost",
    user="postgres",
   password="postgres",
    database="mallorcadb"
)

# create a cursor object to execute SQL queries
mycursor = mydb.cursor()

reader = csv.reader(content, delimiter=',', quotechar='"')
next(reader)

offer_id = 0

for i in range(offer_id):
    next(reader)


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
    "AMS": 0,
    "BER": 1,
    "BLL": 2,
    "BSL": 3,
    "BRE": 4,
    "BRN": 5,
    "BRU": 6,
    "CGN": 7,
    "CRL": 8,
    "CSO": 9,
    "DRS": 10,
    "DTM": 11,
    "DUS": 12,
    "EIN": 13,
    "ERF": 14,
    "FKB": 15,
    "FMM": 16,
    "FMO": 17,
    "FRA": 18,
    "FDH": 19,
    "GRZ": 20,
    "GVA": 21,
    "GWT": 22,
    "HAJ": 23,
    "HAM": 24,
    "HHN": 25,
    "INN": 26,
    "KLU": 27,
    "KRK": 28,
    "KSF": 29,
    "LBC": 30,
    "LEJ": 31,
    "LNZ": 32,
    "LUX": 33,
    "MUC": 34,
    "NRN": 35,
    "NUE": 36,
    "PAD": 37,
    "PRG": 38,
    "RLG": 39,
    "RTM": 40,
    "SCN": 41,
    "SXB": 42,
    "STR": 43,
    "SZG": 44,
    "VIE": 45,
    "WAW": 46,
    "ZRH": 47,
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
    "ACCORDINGDESCRIPTION": 8,
    "PROGRAM": 9
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

    if offer_id % 200000 == 0:
        mydb.commit()


# commit the changes to the database
mydb.commit()

# close the database connection
mydb.close()
