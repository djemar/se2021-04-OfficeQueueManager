# se2021-04-Office Queue Menager

## Office Queue Manager
Open source web app for the Office Queue Management system that manages the queues for desk services open the public 

## Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run locally
 - Clone the project from [Github](https://github.com/djemar/se2021-04-OfficeQueueManager/tree/main/server)
 - Install node modules for server and client with `npm install`
 - In the server folder start the server with `nodemon server.js`
 - In the client folder run the react application with `npm start`<br>
Runs the app in the development mode<br>
Open http://localhost:3000 to view it in the browser<br>
The server will be opened on http://localhost:3001

## React client application routes
- Route `/` : used for main page (it redirects if already logged)
- Route `/officer` : page that contains the officer's components 

## REST API Server

- GET `/api/users`
    - Request parameters : none
    - Response parameters : none
- POST `/api/login`
    - Request parameters : username and password for the query
    - Response parameters : user's name
- DELETE `/api/login/concurrent`
    - Request parameters : none
    - Response parameters : none
- GET `/api/login/concurrent`
    - Request parameters : variable saying if user is authenticated (isAuthenticated)
    - Response parameters : user's name
- GET `/api/tickets`
    - Request parameters : none
    - Response parameters : none
- GET `/api/ticketsbyservices`
    - Request parameters : none
    - Response parameters : none
- GET `/api/services`
    - Request parameters : none
    - Response parameters : none 
- POST `/api/ticket`
    - Request parameters : object describing a ticket
    - Response parameters : none

## Server Database
 - Table `SERVICES` - it contains id, counter1, counter2, counter3, counter4
 - Table `TICKETS` - it contains id, value, userid, serviceid, date, state
 - Table `USERS` - it contains id, name, surname, email, type, password

## Built with
- [React](https://github.com/facebook/react)<br>
- [React-Bootstrap](https://react-bootstrap.github.io/)<br>
- [Express](https://github.com/expressjs/express)<br>
- [SQLite](https://github.com/sqlite/sqlite)<br>

Check out [package.json](https://github.com/djemar/se2021-04-OfficeQueueManager/blob/w1%230-Server/client/package.json)

## Screenshot

## Team
- [Marino Diego](https://github.com/djemar)
- [Cannarella Alessandro]()
- [Cavallo Simone]()
- [Gourlet Katell]()
- [Lanfranco Dario]()
- [Acquaro Claudio]()
- [Lisciandrello Mattia]()



    