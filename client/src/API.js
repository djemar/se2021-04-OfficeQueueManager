import axios from 'axios';

/*
	API.js contains all the API calls and the methods that communicate with the backend.
*/

const BASEURL = '/api';

async function login(credentials) {
  console.log(credentials);
  let jsonCred = JSON.stringify(credentials);
  console.log(jsonCred);
  let response = await fetch(BASEURL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonCred,
  });

  if (response.ok) {
    const officer = await response.json();
    return officer;
  } else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    } catch (err) {
      throw err;
    }
  }
}

async function logout() {
  await fetch('/api/login/current', { method: 'DELETE' });
}

async function getOfficerInfo() {
  const response = await fetch(BASEURL + '/login/current');
  const officerInfo = await response.json();
  if (response.ok) {
    return officerInfo;
  } else {
    throw officerInfo; // an object with the error coming from the server
  }
}

async function getTicketsByServiceId() {
  const response = await fetch(BASEURL + '/ticketsbyservices');
  const tickets = await response.json();
  if (response.ok) {
    console.log(tickets);
    return tickets;
  } else {
    console.log('Errore');
    throw tickets; // an object with the error coming from the server
  }
}

async function getUsers() {
  const response = await fetch(BASEURL + '/users');
  const users = await response.json();
  if (response.ok) {
    return users;
  } else {
    console.log('Errore');
    throw users; // an object with the error coming from the server
  }
}

async function getTickets() {
  const response = await fetch(BASEURL + '/tickets');
  const tickets = await response.json();
  if (response.ok) {
    return tickets;
  } else {
    console.log('Errore');
    throw tickets; // an object with the error coming from the server
  }
}

async function getServices() {
  const response = await fetch(BASEURL + '/services');
  const services = await response.json();
  if (response.ok) {
    return services;
  } else {
    console.log('Errore');
    throw services; // an object with the error coming from the server
  }
}

async function addTicket(ticket) {
  return new Promise((resolve, reject) => {
      fetch(baseURL + '/ticket', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticket)
      }).then((response) => {
          if (response.ok) {
              resolve(null);
          } else {
              //analyze the cause of error
              response.json()
                  .then((obj) => { reject(obj) })       //error message in the response body
                  .catch((err) => { reject({ errors: [{ param: "Application", masg: "Cannot parse server response" }] }) });
          }
      }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) });
  })
}


const API = { login, logout, getOfficerInfo, getTicketsByServiceId, getUsers, getTickets, getServices, addTicket };

export default API;
