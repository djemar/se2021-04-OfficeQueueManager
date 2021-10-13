const express = require('express');
const morgan = require('morgan'); // logging middleware
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { check, validationResult } = require('express-validator'); // validation library
const dao = require('./dao.js');

const jwtSecretContent = require('./secret.js');
const jwtSecret = jwtSecretContent.jwtSecret;

const app = express();
const port = 3001;

// Set-up logging
app.use(morgan('tiny'));

// Process body content
app.use(express.json());


// DB error
const dbErrorObj = { errors: [{ 'param': 'Server', 'msg': 'Database error' }] };
// Authorization error
const authErrorObj = { errors: [{ 'param': 'Server', 'msg': 'Authorization error' }] };

const expireTime = 300; //seconds


// GET /users
// Request body: empty
// Response body: Array of users
// Errors: none
// Don't need authentication
app.get('/api/users', (req, res) => {
    dao.loadUsers()
      .then((users) => res.json(users))
      .catch((err) => res.status(503).json(dbErrorObj));
  })

// GET /tickets
// Request body: empty
// Response body: Array of tickets
// Errors: none
// Don't need authentication
app.get('/api/tickets', (req, res) => {
    dao.loadTickets()
      .then((tickets) => res.json(tickets))
      .catch((err) => res.status(503).json(dbErrorObj));
  })

// GET /services
// Request body: empty
// Response body: Array of services
// Errors: none
// Don't need authentication
app.get('/api/services', (req, res) => {
    dao.loadServices()
      .then((services) => res.json(services))
      .catch((err) => res.status(503).json(dbErrorObj));
  })
  

// To return a better object in case of errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json(authErrorObj);
  }
});
// REST API endpoints
// Resources: Users, Tickets, Services


// GET /users/<user_id>
// Parameter: User id
// Response body: object describing a User
// Error: if the user does not exist, returns {}
app.get('/api/users/:id', (req, res) => {
  console.log(req.params.id);
  dao.findUser(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(503).json(dbErrorObj));
});

// POST /rentals
// Request body: object describing a Ticket (Value,UserID,ServiceID,Date,State) 
// Response body: empty 
app.post('/api/ticket', (req, res) => {
  const ticket = req.body;
  dao.insertTicket(ticket).then((result) => res.end())
    .catch((err) => res.status(503).json(dbErrorObj));
})



app.listen(port, () => console.log(`Server app listening at http://localhost:${port}`));