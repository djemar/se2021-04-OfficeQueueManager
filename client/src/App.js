import logo from './logo.svg';
import './App.css';

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
        console.error(err.error);
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
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                      Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <Button
                      variant="success"
                      onClick={() => {
                        setShow(true);
                      }}
                    >
                      Hi! Login!
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
