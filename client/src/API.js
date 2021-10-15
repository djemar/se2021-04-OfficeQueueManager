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

const API = { login, logout, getOfficerInfo };

export default API;
