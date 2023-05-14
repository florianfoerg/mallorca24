# Mallorca24

LIVE VERSION: [mallorca24.florianfoerg.com](http://mallorca24.florianfoerg.com)

Mallorca24 is a web application that was created as part of CHECK24's holiday coding challenge.
The goal of the challenge was to create an online platform that connects customers with hotels in Mallorca, allowing them to search and book offers that meet their specific requirements.
The full description can be found here: https://github.com/check24-scholarships/holiday-challenge.

## System Structure

The application is composed of several subsystems, each responsible for managing a different aspect of the platform. The overall structure of the system is illustrated in the following component diagram:

![component diagram showing the structure of the system](https://github.com/florianfoerg/mallorca24/blob/master/rsc/structure%20holiday%20challenge.svg)

### Frontend

Provides a responsive user interface. Utilizes data from the `Mallorca-Service`. See: [Frontend](https://github.com/florianfoerg/mallorca24/blob/master/client/frontend).

### Backend

- `Mallorca-Service`: Responsible for providing an API to multiple services. Handles queries and modifications related to offers, hotels, and customers. Calls the `Email-Service` for sending confirmation emails. See [Mallorca-Service](https://github.com/florianfoerg/mallorca24/tree/master/server/mallorca-service).

- `Email-Service`: Responsible for generating booking confirmation PDFs and sending emails to customers and hotels. See [Email-Service](https://github.com/florianfoerg/mallorca24/tree/master/server/mail-service).

- `Recommendation-Service`: Responsible for updating the database to modify hotel recommendations every 12-hour interval. See [Recommendation-Service](https://github.com/florianfoerg/mallorca24/tree/master/server/hotel-recommendation-service).

- `Setup`: Can be used to initialize the database and create mock data. See [Setup](https://github.com/florianfoerg/mallorca24/tree/master/server/setup).



## Features and Optimisations

### Feature List

#### Required Features
- <span style="color: green; font-weight: bold;">✓</span> Efficiently search through all data using various filtering options.
- <span style="color: green; font-weight: bold;">✓</span> Present two result pages: one displaying the minimum prices for each hotel and another showing all suitable offers.
- <span style="color: green; font-weight: bold;">✓</span> Ensure fast loading times.

#### Additional Features
- <span style="color: green; font-weight: bold;">✓</span> Enable sorting of offer results by relevance, minimum price, and maximum price.
- <span style="color: green; font-weight: bold;">✓</span> Allow booking of offers, which makes them unavailable for further searching.
- <span style="color: green; font-weight: bold;">✓</span> Automatically send a confirmation email with an attached PDF upon booking an offer.
- <span style="color: green; font-weight: bold;">✓</span> Enhance offer and hotel data by adding mock values for images, descriptions, swimming pools, and durations.
- <span style="color: green; font-weight: bold;">✓</span> Display a map with a marker indicating the hotel's location.
- <span style="color: green; font-weight: bold;">✓</span> Provide advanced search functionality, including hotel stars, ocean view, meal type, room type, maximum price, and swimming pool.
- <span style="color: green; font-weight: bold;">✓</span> Update hotel recommendations automatically every 12 hours.
- <span style="color: green; font-weight: bold;">✓</span> Ensure a responsive design that optimizes the website for different screen sizes.
- <span style="color: green; font-weight: bold;">✓</span> Implement safeguards to process only valid search and booking requests.
- <span style="color: green; font-weight: bold;">✓</span> Facilitate easy setup with Docker support and setup scripts.
- <span style="color: green; font-weight: bold;">✓</span> Added HTTPS support.

### Performance optimization
To optimize loading times, the system incorporates the following strategies:

1) Leveraging specialized search tables dedicated to storing offers. By employing a hash value computed from count_adults, count_children, and duration, the system intelligently selects the appropriate search table for each query.
2) Implementing partitioning for the offer table based on hotel_id, ensuring rapid query execution when the hotel is specified. The decision to use PostgreSQL as the DBMS was motivated by its support for partitioning with foreign keys, a feature absent in MySQL.
3) Employing multiple btrees indexes on the tables to streamline query performance and deliver efficient processing times. These indexes are instrumental in achieving optimal time complexity.
4) Duration is stored in offer that it only has to be computed once. 

## How to run

The following guid provides an overview of how to run the application on Ubuntu (servers). All other operating systems work similar. 
Please make sure your Docker works properly. If you do not have installed it yet use `./install-docker.sh`.

### Only run frontend

If you only want to run the frontend and use the default backend, you can set it up in one single command. Please have a look at [Frontend Setup](https://github.com/florianfoerg/mallorca24/blob/master/client/frontend/README.md).

### Run frontend and backend

Follow the following steps in order to set up backend services:

1) [Main Backend Setup](https://github.com/florianfoerg/mallorca24/tree/master/server/mallorca-service/README.md)
2) [Mail Service Setup](https://github.com/florianfoerg/mallorca24/tree/master/server/mail-service/README.md)
3) [Recommendation Service Setup](https://github.com/florianfoerg/mallorca24/tree/master/server/hotel-recommendation-service/README.md)
4) [Database Initialization](https://github.com/florianfoerg/mallorca24/tree/master/server/setup/README.md)

Finally, use [Frontend Setup](https://github.com/florianfoerg/mallorca24/blob/master/client/frontend/README.md) to set up the frontend services.

