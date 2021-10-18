import { Container, Card, Row } from 'react-bootstrap';
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
import Ticket from '../Ticket/Ticket';

const Dashboard = ({ ...props }) => {
  const { user, name, loggedIn, login, logout, loading } = props;
  const [dirty, setDirty] = useState(true);
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(2);
  const [userTicket, setUserTicket] = useState(-1);
  const [ticket, setTicket] = useState({});
  const [loadingTicket, setLoadingTicket] = useState(true);
  // const [mainHead, setMainHead] = useState(1);
  // const [mainTail, setMainTail] = useState();
  const [tickets, setTickets] = useState([]);
  const [services, setServices] = useState([]);
  const [countersValues, setCountersValues] = useState([0, 0, 0, 0]);
  const [groupedTickets, setGroupedTickets] = useState([]);
  let pairings = [];

  useEffect(() => {
    //useEffect è un hook che permette di usare i lyfecycle del component. Equivale alla componentDidMount, componentDidUpdate, componentWillUnmount.
    const getTickets = async () => {
      const tickets = await API.getTickets();
      setTickets(tickets);
    };

    const getGroupedTickets = async () => {
      const gTickets = await API.getTicketsByServiceId();
      setGroupedTickets(gTickets);
    };
    getGroupedTickets().then(() => {
      setDirty(false);
    });

    getTickets().then(() => {
      setDirty(false);
    });
  }, [dirty, loggedIn, loading]);

  useEffect(() => {
    //useEffect è un hook che permette di usare i lyfecycle del component. Equivale alla componentDidMount, componentDidUpdate, componentWillUnmount.
    const getServices = async () => {
      const services = await API.getServices();
      setServices(services);
    };

    getServices().then(() => {
      setDirty(false);
    });
  }, [dirty, loggedIn, loading]);

  //console.log('tickets', tickets);

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
                ticket={ticket}
                counter={counter}
                userTicket={userTicket}
                tickets={tickets}
                loadingTicket={loadingTicket}
                groupedTickets={groupedTickets}
                dirty={dirty}
                setDirty={setDirty}
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
                    groupedTickets={groupedTickets}
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
              <h2>Get Ticket</h2>

              {userTicket !== -1 && !loadingTicket && !dirty && (
                <Ticket
                  ticket={ticket}
                  status="Waiting"
                  userTicket={userTicket}
                />
              )}
              <QueueSet
                services={services}
                counter={counter}
                user={user}
                userTicket={userTicket}
                setTicket={setTicket}
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
