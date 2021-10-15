# se2021-04-Office Queue Menager

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
- GET `/api/users/:id`
    - Request parameters : user's id
    - Response parameters : object describing the user 
- POST `/api/ticket`
    - Request parameters : object describing a ticket
    - Response parameters : none

## Server Database
 - Table `SERVICES` - it contains id, counter1, counter2, counter3, counter4
 - Table `TICKETS` - it contains id, value, userid, serviceid, date, state
 - Table `USERS` - it contains id, name, surname, email, type, password

## Main React Components

## Screenshot



    