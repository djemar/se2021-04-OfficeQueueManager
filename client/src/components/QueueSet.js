import { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import API from '../API';
function QueueSet(props) {
  /* This function is used to understand which queues are needed for this specific counter */
  //let [services, setServices] = useState([]);

  const allServices = [
    {
      ID: 1,
      Counter1: 1,
      Counter2: 1,
      Counter3: 1,
      Counter4: 0,
      Name: 'Bank account',
    },
    {
      ID: 2,
      Counter1: 1,
      Counter2: 1,
      Counter3: 0,
      Counter4: 0,
      Name: 'Bank account',
    },
    {
      ID: 3,
      Counter1: 1,
      Counter2: 1,
      Counter3: 0,
      Counter4: 1,
      Name: 'Postepay',
    },
    {
      ID: 4,
      Counter1: 1,
      Counter2: 0,
      Counter3: 1,
      Counter4: 0,
      Name: 'Postal savings',
    },
  ];

  /* todo: fetch to the DB in order to get the services of this props.counter */
  let currentServices = [1, 2];
  //setServices(tmp_services);

  if (!props.user) {
    currentServices = allServices; // user can see all the queues
  }
  return currentServices.map(index => (
    <Queue
      key={index}
      counter={props.counter}
      user={props.user}
      userTicket={props.userTicket}
      setUserTicket={props.setUserTicket}
      setLoadingTicket={props.setLoadingTicket}
      pairings={props.pairings}
      tickets={props.tickets}
      setTickets={props.tickets}
      setDirty={props.setDirty}
      index={index}
    />
  ));
}

// eslint-disable-next-line react/no-multi-comp
function Queue(props) {
  return (
    <>
      <h2>Service number: {props.index}</h2>
      {props.user === 0 ? (
        <Container>
          <Row className="justify-content-md-center">
            User button: displays number of people waiting on this service
          </Row>
          <Row>
            <Col />
            <Col>
              {props.userTicket === -1 ? (
                <Button
                  onClick={event => {
                    event.preventDefault();
                    let today = new Date();
                    let date =
                      today.getFullYear() +
                      '-' +
                      (today.getMonth() + 1) +
                      '-' +
                      today.getDate();
                    let value = props.tickets.slice(-1)[0].Value;

                    API.addTicket(value + 1, 0, props.index, date, 'not served')
                      .then(() => {
                        props.setDirty(true);
                        props.pairings.push(props.index);
                        props.setLoadingTicket(false);
                        props.setUserTicket(value + 1);
                      })
                      .catch(function (error) {
                        console.log(error);
                        alert('Si è verificato un errore, riprova.');
                      });
                  }}
                >
                  Get a ticket for this service
                </Button>
              ) : (
                <strong>Ticket taken!</strong>
              )}
            </Col>
            <Col />
          </Row>
        </Container>
      ) : (
        <Container>
          <Row className="justify-content-md-center">
            Officer button: displays top ticket
          </Row>
          {/*<Row>
            <Col />
            <Col>
              <Button
                onClick={event => {
                  event.preventDefault();
                  if (
                    !props.tickets.slice(-1)[0] >= 1 &&
                    !props.tickets.slice(0)[0] < !props.tickets.slice(0)[0]
                  ) {
                    setHead(props.tickets.slice(-1).Value + 1);
                  }
                }}
              >
                {!!props.tickets.slice(-1)
                  ? 'EMPTY'
                  : !props.tickets.slice(0).Value}
              </Button>
            </Col>
            <Col />

          </Row>
          */}
        </Container>
      )}
    </>
  );
}

export default QueueSet;
