import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import QueueSet from './QueueSet.js';
import { useState } from 'react';
import { Container } from 'react-bootstrap';

function App() {
  let [counter, setCounter] = useState(2);
  let [user, setUser] = useState(0);
  let [userTicket, setUserTicket] = useState(-1);
  let [loadingTicket, setLoadingTicket] = useState(true);
  let [mainHead, setMainHead] = useState(0);
  let [mainTail, setMainTail] = useState(0);

  let pairings = []; // value in position i means that the i-th ticket is associated to the indicated service

  return (
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
    </div>
  );
}

export default App;
