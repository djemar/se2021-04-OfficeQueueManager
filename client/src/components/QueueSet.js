import { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

function QueueSet(props) {
  /* This function is used to understand which queues are needed for this specific counter */
  //let [services, setServices] = useState([]);

  const allServices = [1, 2, 3, 4, 5, 6];
  /* todo: fetch to the DB in order to get the services of this props.counter */
  let currentServices = [1, 2];
  //setServices(tmp_services);

  if (!props.user) {
    currentServices = allServices; // user can see all the queues
  }
  return currentServices.map(index => (
    <Queue
      counter={props.counter}
      user={props.user}
      userTicket={props.userTicket}
      setUserTicket={props.setUserTicket}
      setLoadingTicket={props.setLoadingTicket}
      pairings={props.pairings}
      mainHead={props.mainHead}
      setMainHead={props.setMainHead}
      mainTail={props.mainTail}
      setMainTail={props.setMainTail}
    />
  ));
}

// eslint-disable-next-line react/no-multi-comp
function Queue(props) {
  let [head, setHead] = useState(0);
  let [tail, setTail] = useState(0);

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
                    props.setUserTicket(props.mainTail + 1);
                    setTail(tail + 1);
                    props.pairings.push(props.index);
                    props.setMainTail(props.mainTail + 1);
                    props.setLoadingTicket(false);
                  }}
                >
                  {!tail ? 'EMPTY' : tail}
                </Button>
              ) : (
                <Button>{tail}</Button>
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
          <Row>
            <Col />
            <Col>
              <Button
                onClick={event => {
                  event.preventDefault();
                  if (tail >= 1 && head < tail) {
                    props.setMainHead(head + 1);
                    setHead(head + 1);
                  }
                }}
              >
                {!tail ? 'EMPTY' : head}
              </Button>
            </Col>
            <Col />
          </Row>
        </Container>
      )}
    </>
  );
}

export default QueueSet;
