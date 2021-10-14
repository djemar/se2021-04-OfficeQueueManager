const express = require("express");
const morgan = require("morgan"); // logging middleware
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { check, validationResult } = require("express-validator"); // validation library
const dao = require("./dao.js");

const jwtSecretContent = require("./secret.js");
const jwtSecret = jwtSecretContent.jwtSecret;

const passport = require("passport"); // auth middleware
const LocalStrategy = require("passport-local").Strategy; // username and password for login
const session = require("express-session"); // enable sessions

const app = express();
const port = 3001;

// Set-up logging
app.use(morgan("tiny"));

// Process body content
app.use(express.json());

// DB error
const dbErrorObj = { errors: [{ param: "Server", msg: "Database error" }] };
// Authorization error
const authErrorObj = {
  errors: [{ param: "Server", msg: "Authorization error" }],
};

const expireTime = 300; //seconds

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (username, password, done) {
      dao.getOfficer(username, password).then((user) => {
        if (!user)
          return done(null, false, {
            message: "Incorrect username and/or password.",
          });

        return done(null, user);
      });
    }
  )
);

// serialize and de-serialize the user (user object <-> session)

// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  dao
    .getOfficerById(id)
    .then((user) => {
      done(null, user); // this will be available in req.user
    })
    .catch((err) => {
      done(err, null);
    });
});

// set up the session
app.use(
  session({
    // by default, Passport uses a MemoryStore to keep track of the sessions
    secret:
      "a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie",
    resave: false,
    saveUninitialized: false,
  })
);

// then, init passport
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};

//login
app.post(
  "/api/login",
  [check("email").isEmail(), check("password").isString()],
  function (req, res, next) {
    console.log("uwu");
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err) return next(err);

        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user.name);
      });
    })(req, res, next);
  }
);

// DELETE /login/current
// logout
app.delete("/api/login/current", isLoggedIn, (req, res) => {
  req.logout();
  res.end();
});

app.get("/api/login/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user.name);
  } else res.status(401).json({ error: "Unauthenticated user!" });
});

// GET /users
// Request body: empty
// Response body: Array of users
// Errors: none
// Don't need authentication
app.get("/api/users", (req, res) => {
  dao
    .loadUsers()
    .then((users) => res.json(users))
    .catch((err) => res.status(503).json(dbErrorObj));
});

// GET /tickets
// Request body: empty
// Response body: Array of tickets
// Errors: none
// Don't need authentication
app.get("/api/tickets", (req, res) => {
  dao
    .loadTickets()
    .then((tickets) => res.json(tickets))
    .catch((err) => res.status(503).json(dbErrorObj));
});

// GET /services
// Request body: empty
// Response body: Array of services
// Errors: none
// Don't need authentication
app.get("/api/services", (req, res) => {
  dao
    .loadServices()
    .then((services) => res.json(services))
    .catch((err) => res.status(503).json(dbErrorObj));
});

// To return a better object in case of errors
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json(authErrorObj);
  }
});
// REST API endpoints
// Resources: Users, Tickets, Services

// GET /users/<user_id>
// Parameter: User id
// Response body: object describing a User
// Error: if the user does not exist, returns {}
app.get("/api/users/:id", (req, res) => {
  console.log(req.params.id);
  dao
    .findUser(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(503).json(dbErrorObj));
});

// POST /rentals
// Request body: object describing a Ticket (Value,UserID,ServiceID,Date,State)
// Response body: empty
app.post("/api/ticket", (req, res) => {
  const ticket = req.body;
  dao
    .insertTicket(ticket)
    .then((result) => res.end())
    .catch((err) => res.status(503).json(dbErrorObj));
});

app.listen(port, () =>
  console.log(`Server app listening at http://localhost:${port}`)
);
