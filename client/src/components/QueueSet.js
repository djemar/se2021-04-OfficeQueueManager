import { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import API from '../API';

function QueueSet(props) {
  /* This function is used to understand which queues are needed for this specific counter */
  //let [services, setServices] = useState([]);

  /*const allServices = [
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
  ];*/
  let allServices = props.services;
  console.log(allServices);

  /* todo: fetch to the DB in order to get the services of this props.counter */
  let currentServices = allServices;
  // currentServices should contain only the services of the current counter (an officer should be associated to a counter TODO)
  currentServices = currentServices.filter(item => {
    switch (props.counter) {
      case 1:
        return item.Counter1;
      case 2:
        return item.Counter2;
      case 3:
        return item.Counter3;
      case 4:
        return item.Counter4;
      default:
        console.log("The current counter doesn't exist.");
        return false;
    }
  });

  if (!props.user) {
    currentServices = allServices; // user can see all the queues
  }
  return currentServices.map((item, index) => (
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
      item={item}
    />
  ));
}

// eslint-disable-next-line react/no-multi-comp
function Queue(props) {
  console.log(props.item);
  return (
    <>
      <h2>
        Service number: {props.index + 1} - Service name: {props.item.Name}
      </h2>
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
                    // todo: Hour - Minute - Second (dayjs ?)
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
                        alert('An error occurs, try again.');
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
