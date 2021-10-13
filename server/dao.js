'use strict';

const Ticket = require('./ticket');
const User = require('./user');
const Service = require('./service');

const bcrypt = require('bcrypt');
const moment = require('moment');

// Data Access Object
// DAO module for accessing courses and exams

const sqlite = require('sqlite3');
const db = new sqlite.Database('OfficeQueueManager.sqlite', (err) => {
  if (err) throw err;
});

//Query 

exports.loadUsers = function () {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT *  FROM USERS';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          console.log('ritorna errore!');
          return;
        }
        if (rows.length === 0) {
          reject(null);
          console.log('ritornano 0 righe!');
          return;
        }
        const users = rows;
        resolve(users);
        return;
      })
    })
  }

  exports.loadTickets = function () {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT *  FROM TICKETS';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          console.log('ERROR!');
          return;
        }
        if (rows.length === 0) {
          reject(null);
          console.log('0 ROWS!');
          return;
        }
        const tickets = rows;
        resolve(tickets);
        return;
      })
    })
  }

  exports.loadServices = function () {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT *  FROM SERVICES';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          console.log('ERROR!');
          return;
        }
        if (rows.length === 0) {
          reject(null);
          console.log('0 ROWS!');
          return;
        }
        const services = rows;
        resolve(services);
        return;
      })
    })
  }


  exports.findUser = function (id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * from USERS where ID = ?';
      db.all(sql, [id], (err, row) => {
        if (err)
          reject(err);
        else {
          if (row == undefined) {
            console.log("Row undefined");
            resolve({});
          }
          resolve(row);
        }
      })
    })
  
  }
  