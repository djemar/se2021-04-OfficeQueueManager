import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import QueueSet from './QueueSet.js';
import { useState } from 'react';
import { Container } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import API from './API';
import LoginModal from './LoginModal';
import { Container, Button, Row } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

let arr = ['Pizza', 'Pasta', 'Mozzarella'];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [dirty, setDirty] = useState(true);
  const [show, setShow] = useState(false);
  let [counter, setCounter] = useState(2);
  let [user, setUser] = useState(0);
  let [userTicket, setUserTicket] = useState(-1);
  let [loadingTicket, setLoadingTicket] = useState(true);
  let [mainHead, setMainHead] = useState(0);
  let [mainTail, setMainTail] = useState(0);

  let pairings = []; // value in position i means that the i-th ticket is associated to the indicated service

  const login = async credentials => {
    try {
      const officerInfo = await API.login(credentials);
      console.log(officerInfo);
      setLoggedIn(true);
      setDirty(true);
      setName(officerInfo);
      return true;
    } catch (err) {
      alert(err);
      return false;
    }
  };

  const logout = async () => {
    await API.logout();
    setLoggedIn(false);
    setName('');
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let officerInfo = await API.getOfficerInfo();
        setLoggedIn(true);
        setName(officerInfo);
      } catch (err) {
        console.log(err.error);
      }
    };
    checkAuth();
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path="/officer"
          render={() =>
            loggedIn ? (
              <div className="App">
                <header className="App-header">
                  <h1>Benvenuto {name}!</h1>
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Edit <code>src/App.js</code> and save to reload.
                  </p>
                  <Button
                    variant="danger"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </Button>

                  <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn React
                  </a>
                </header>
              </div>
            ) : (
              <Redirect to="/" />
            )
          }
        ></Route>
        <Route
          path="/"
          render={() => (
            <>
              {loggedIn ? (
                <Redirect path="/" to="/officer" />
              ) : (
              
    <div className="App">
    <strong>Queues branch</strong>
    {!user ? (
      <>
        <h1>Counter: {counter}</h1>
        <div>
          {userTicket !== -1 ? (
            !loadingTicket ? (
              <Container fluid>
                <h1>
                  Your ticket number is: <strong>{userTicket}</strong>
                </h1>
              </Container>
            ) : (
              <div />
            )
          ) : (
            <div />
          )}
        </div>
      </>
    ) : (
      <div />
    )}
    <QueueSet
      counter={counter}
      user={user}
      userTicket={userTicket}
      setUserTicket={setUserTicket}
      setLoadingTicket={setLoadingTicket}
      mainHead={mainHead}
      setMainHead={setMainHead}
      mainTail={mainTail}
      setMainTail={setMainTail}
      pairings={pairings}
    />


                    <Button
                      variant="success"
                      onClick={() => {
                        setShow(true);
                      }}
                    >
                      Hi! Login!
                    </Button>


                  <LoginModal
                    login={login}
                    show={show}
                    setShow={setShow}
                    name={name}
                    setName={setName}
                  ></LoginModal>
                </div>
              )}
            </>
          )}
        ></Route>
      </Switch>
    </Router>

  );
}

export default App;
