import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import QueueSet from './components/QueueSet.js';

import { useState, useEffect } from 'react';
import API from './API';
import LoginModal from './components/LoginModal';
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
  const [counter, setCounter] = useState(2);
  const [user, setUser] = useState(0); // 0 = user, 1 = officer, 2 = manager
  const [userTicket, setUserTicket] = useState(-1);
  const [loadingTicket, setLoadingTicket] = useState(true);
  // const [mainHead, setMainHead] = useState(1);
  // const [mainTail, setMainTail] = useState();
  const [tickets, setTickets] = useState([]);
  const [services, setServices] = useState([]);
  const [countersValues, setCountersValues] = useState([0, 0, 0, 0]);

  let pairings = []; // value in position i means that the i-th ticket is associated to the indicated service

  const login = async credentials => {
    try {
      const officerInfo = await API.login(credentials);
      setLoggedIn(true);
      setDirty(true);
      setName(officerInfo);
      setUser(1); // In the final project it will be settled wether it's a manager or an officer.
      // Right now we always set it to Officer for simplicity
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
    setUser(0);
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

  useEffect(() => {
    //useEffect è un hook che permette di usare i lyfecycle del component. Equivale alla componentDidMount, componentDidUpdate, componentWillUnmount.
    const getTickets = async () => {
      const t = await API.getTickets();
      console.log(t);
      setTickets(t);
    };

    getTickets().then(() => {
      setDirty(false);
    });
  }, [dirty, loggedIn]);

  useEffect(() => {
    //useEffect è un hook che permette di usare i lyfecycle del component. Equivale alla componentDidMount, componentDidUpdate, componentWillUnmount.
    const getServices = async () => {
      const t = await API.getServices();
      console.log(t);
      setServices(t);
    };

    getServices().then(() => {
      setDirty(false);
    });
  }, [dirty, loggedIn]);

  return (
    <Router>
      <Switch>
        <Route
          path="/officer"
          render={() =>
            loggedIn ? (
              <div className="App">
                <h1>Queue Management System</h1>
                <Button
                  variant="danger"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>
                <hr />
                <h1>Welcome {name}!</h1>
                <hr />
                <Container fluid>
                  <h1>Working at counter {counter}.</h1>
                  <Button
                    onClick={event => {
                      event.preventDefault();
                      // TODO: find next client according to the algo
                    }}
                    variant="warning"
                    size="lg"
                  >
                    Serve the next client.
                  </Button>
                </Container>
                <hr />
                <QueueSet
                  counter={counter}
                  user={user}
                  userTicket={userTicket}
                  setUserTicket={setUserTicket}
                  setLoadingTicket={setLoadingTicket}
                  tickets={tickets}
                  setTickets={setTickets}
                  services={services}
                  pairings={pairings}
                  setDirty={setDirty}
                />
              </div>
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/"
          render={() => (
            <>
              {loggedIn ? (
                <Redirect path="/" to="/officer" />
              ) : (
                <div className="App">
                  <h1>
                    Queue Management System <br />
                    <Button
                      variant="success"
                      onClick={() => {
                        setShow(true);
                      }}
                    >
                      Login
                    </Button>
                  </h1>
                  <hr />
                  {!user ? (
                    <>
                      <h1>Counter: {counter}</h1>
                      <div>
                        {userTicket !== -1 ? (
                          !loadingTicket ? (
                            <Container fluid>
                              <h3>
                                Your ticket number is:{' '}
                                <strong>{userTicket}</strong>
                                <br />
                                The current ticket number being served is:{' '}
                                <strong>{tickets[0].Value}</strong>
                                <hr />
                              </h3>
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
                    tickets={tickets}
                    setTickets={setTickets}
                    services={services}
                    pairings={pairings}
                    setDirty={setDirty}
                  />
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
