# Mallorca24

LIVE VERSION: [mallorca24.florianfoerg.com](http://mallorca24.florianfoerg.com)

Mallorca24 is a web application that was created as part of CHECK24's holiday coding challenge.
The goal of the challenge was to create an online platform that connects customers with hotels in Mallorca, allowing them to search and book offers that meet their specific requirements.
The full description can be found here: https://github.com/check24-scholarships/holiday-challenge.

## System Structure

The application is composed of several subsystems, each responsible for managing a different aspect of the platform. The overall structure of the system is illustrated in the following component diagram:

![component diagram showing the structure of the system](https://github.com/florianfoerg/mallorca24/blob/master/rsc/structure%20holiday%20challenge.png)

### Frontend
The frontend is responsible for providing a graphical user interface that allows users to interact with the platform.
It is built using React and communicates with the backend through a REST API provided by the holiday-gateway subsystem.
The frontend is divided into two major parts:

- react-frontend: The frontend of the application is written with React. It is separated into two major parts:
    1. The customer-UI: This part of the frontend is used by customers to search for and book offers. Customers can enter their search criteria and view the results, which are displayed in a user-friendly way. Once they have found an offer they are interested in, they can proceed to book it.
       TODO:add pictures!
    2. hotel-UI: This part of the frontend is used by hotels to manage their offers. Hotels can see when a customer books an offer, delete offers that are no longer available, and add new ones. They can also update their hotel-specific data, such as contact information and amenities.
       TODO: add pictures/add test information!

### Backend
The backend is responsible for managing the data sets that power the platform and providing the services that the frontend uses to communicate with the various subsystems. The Backend-subsystem assumes, that all requests within the system itself are self. Therefore, there are no security checks within the system (NO Zero Trust)
.
- holiday-gateway: This subsystem is responsible for handling security checks and distributing requests to the other subsystems. It is built using Java and the Spring framework.
- holiday-mail: This subsystem is a microservice that is used to send emails to hotels and customers when orders are booked. It is written in Python.
- holiday-offer-order: This subsystem is responsible for managing and processing all data that can be characterized as offers or orders. Its main purpose is to efficiently process search queries by customers. Also, It is responsible for keeping track of which offers have been booked and by whom. It is built using Java and the Spring framework.
- databases: TODO ER Modell!

## Requirements and optimisations

TODO

## Run and test the application

TODO
