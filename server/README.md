# se2021-04-Office Queue Manager

## Office Queue Manager
Open source web app for the Office Queue Management system that manages the queues for desk services open the public

## Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run locally
- Clone the project from [Github](https://github.com/djemar/se2021-04-OfficeQueueManager/tree/main/server)
- Install node modules for server and client with `npm install`
  - In the server folder start the server with `nodemon server.js`
    - it could need to be installed locally on your pc with `npm install -g nodemon`
- In the client folder run the react application with `npm start`<br>
  It runs the app in the development mode<br>
  Open http://localhost:3000 to view it in the browser<br>
  The server will be opened on http://localhost:3001. It is configured as the proxy for the client


## React client application routes
- Route `/` : used for main page
- Route `/officer` : page that contains the officer's components

## REST API Server

- GET `/api/users`
  - Request parameters : none
  - Response parameters : none
- POST `/api/login`
  - Send the credentials in order to log in
  - Request parameters : A JSON containing email and password
  - Response parameters : A json containing the officer's name
- DELETE `/api/login/current`
  - If the user is logged in, it logs him out
  - Request parameters : none
  - Response parameters : A status which tells if the operation was completed correctly
- GET `/api/login/current`
  - Retrieves the information regarding a logged in officer
  - Request parameters : none
  - Response parameters : A json containing the officer's name
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
- Table `USERS` - it contains id, name, surname, email, type, password.
  - The password of the officer is crypted through bcrypt

## Built with
- [React](https://github.com/facebook/react)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Express](https://github.com/expressjs/express)
- [Passport](http://www.passportjs.org/)
- [SQLite](https://github.com/sqlite/sqlite)
-

Check out [package.json](https://github.com/djemar/se2021-04-OfficeQueueManager/blob/w1%230-Server/client/package.json)

## Screenshot

## User credential
- email: s286329@studenti.polito.it, name: Mattia, surname: Lisciandrello, password: teamSE04

## Team
- [Marino Diego](https://github.com/djemar)
- [Cannarella Alessandro]()
- [Cavallo Simone]()
- [Gourlet Katell]()
- [Lanfranco Dario]()
- [Acquaro Claudio]()
- [Lisciandrello Mattia](https://github.com/Stormz4)
