import { Container } from 'react-bootstrap';
import LoginModal from '../Login/LoginModal';
import NavBar from '../NavBar/NavBar';
import { QueueSet } from '../Queue';
import { useState, useEffect } from 'react';
import API from '../../API';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Manage from '../Manage/Manage';
import Board from '../Board/Board';

const Dashboard = ({ ...props }) => {
  const { user, name, loggedIn, login, logout } = props;
  const [dirty, setDirty] = useState(true);
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(2);
  const [userTicket, setUserTicket] = useState(-1);
  const [loadingTicket, setLoadingTicket] = useState(true);
  // const [mainHead, setMainHead] = useState(1);
  // const [mainTail, setMainTail] = useState();
  const [tickets, setTickets] = useState([]);
  const [services, setServices] = useState([]);
  const [countersValues, setCountersValues] = useState([0, 0, 0, 0]);

  let pairings = [];

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

  console.log('logged:', loggedIn);
  return (
    <>
      <Router>
        <NavBar
          setShow={setShow}
          logout={logout}
          loggedIn={loggedIn}
          user={user}
        />
        <Container>
          <Switch>
            <Route path="/board">
              <Board
                counter={counter}
                userTicket={userTicket}
                tickets={tickets}
                loadingTicket={loadingTicket}
              />
            </Route>
            <Route path="/manage">
              <>
                {loggedIn && user === (1 || 2) ? (
                  <Manage
                    name={name}
                    services={services}
                    counter={counter}
                    user={user}
                    userTicket={userTicket}
                    tickets={tickets}
                    setDirty={setDirty}
                    setLoadingTicket={setLoadingTicket}
                    setUserTicket={setUserTicket}
                    pairings={pairings}
                  />
                ) : (
                  <Redirect to="/" />
                )}
              </>
            </Route>
            <Route path="/stats">
              <>
                {loggedIn && user === 2 ? (
                  <div>stats</div>
                ) : (
                  <Redirect to="/" />
                )}
              </>
            </Route>
            <Route path="/">
              <QueueSet
                services={services}
                counter={counter}
                user={user}
                userTicket={userTicket}
                tickets={tickets}
                setDirty={setDirty}
                setLoadingTicket={setLoadingTicket}
                setUserTicket={setUserTicket}
                pairings={pairings}
              />
            </Route>
          </Switch>
          <LoginModal login={login} show={show} setShow={setShow} />
        </Container>
      </Router>
    </>
  );
};

export default Dashboard;
