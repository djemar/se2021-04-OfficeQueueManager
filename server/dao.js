"use strict";

const Ticket = require("./ticket");
const User = require("./user");
const Service = require("./service");

const bcrypt = require("bcrypt");
const moment = require("moment");

// Data Access Object
// DAO module for accessing courses and exams

// Password are made with bcrypt
// officer email: s286329@studenti.polito.it
// current officer has password: teamSE04
// https://www.browserling.com/tools/bcrypt
const sqlite = require("sqlite3");
const db = new sqlite.Database("OfficeQueueManager.sqlite", (err) => {
  if (err) throw err;
});

//Query

exports.getOfficer = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.get(sql, [email], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: row.ID, username: row.Email, name: row.Name };
        // check the hashes with an async call

        bcrypt.compare(password, row.Password).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
      }
    });
  });
};

exports.getOfficerById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve({ error: "User not found." });
      else {
        // by default, the local strategy looks for "username"
        const user = { id: row.id, username: row.email, name: row.name };
        resolve(user);
      }
    });
  });
};

exports.loadUsers = function () {
  return new Promise((resolve, reject) => {
    const sql = "SELECT *  FROM USERS";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        console.log("ritorna errore!");
        return;
      }
      if (rows.length === 0) {
        reject(null);
        console.log("ritornano 0 righe!");
        return;
      }
      const users = rows;
      resolve(users);
      return;
    });
  });
};

exports.loadTickets = function () {
  return new Promise((resolve, reject) => {
    const sql = "SELECT *  FROM TICKETS";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        console.log("ERROR!");
        return;
      }

      if (rows.length === 0) {
        reject(null);
        console.log("0 ROWS!");
        return;
      }

      const tickets = rows;
      resolve(tickets);
      return;
    });
  });
};

exports.loadTicketsByService = function () {
  return new Promise((resolve, reject) => {
    const sql = "SELECT *  FROM TICKETS";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        console.log("ERROR!");
        return;
      }

      if (rows.length === 0) {
        reject(null);
        console.log("0 ROWS!");
        return;
      }
      let obj = [];
      obj = rows.reduce((acc, currVal) => {
        acc[currVal.ServiceID] = [...(acc[currVal.ServiceID] || []), currVal];
        return acc;
      }, {});
      resolve(obj);
      return;
    });
  });
};

exports.loadServices = function () {
  return new Promise((resolve, reject) => {
    const sql = "SELECT *  FROM SERVICES";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        console.log("ERROR!");
        return;
      }
      if (rows.length === 0) {
        reject(null);
        console.log("0 ROWS!");
        return;
      }
      const services = rows;
      resolve(services);
      return;
    });
  });
};

exports.findUser = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from USERS where ID = ?";
    db.all(sql, [id], (err, row) => {
      if (err) reject(err);
      else {
        if (row == undefined) {
          console.log("Row undefined");
          resolve({});
        }
        resolve(row);
      }
    });
  });
};

exports.insertTicket = function (ticket) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO TICKETS(Value,UserID,ServiceID,Date,State) VALUES (?,?,?,?,?)";
    //ID is not needed. It's added by the insert operation
    db.run(
      sql,
      [
        ticket.value,
        ticket.userid,
        ticket.serviceid,
        ticket.date,
        ticket.state,
      ],
      function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("Added successfully");
          resolve(null);
        }
      }
    );
  });
};
