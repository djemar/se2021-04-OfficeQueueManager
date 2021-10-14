import { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

function QueueSet(props) {
  /* This function is used to understand which queues are needed for this specific counter */
  //let [services, setServices] = useState([]);

  /* todo: fetch to the DB in order to get the services of this props.counter */
  let tmp_services = [1, 2];
  //setServices(tmp_services);

  return tmp_services.map(index => (
    <Queue index={index} counter={props.counter} user={props.user} />
  ));
}

// eslint-disable-next-line react/no-multi-comp
function Queue(props) {
  let [head, setHead] = useState(0);
  let [tail, setTail] = useState(0);

  return (
    <>
      <h1>Service number: {props.index}</h1>
      {props.user === 0 ? (
        <Container>
          <Row className="justify-content-md-center">
            User button: displays last ticket
          </Row>
          <Row>
            <Col />
            <Col>
              <Button
                onClick={event => {
                  event.preventDefault();
                  setTail(tail + 1);
                }}
              >
                {!tail ? 'EMPTY' : tail}
              </Button>
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
                  if (tail >= 1 && head < tail) setHead(head + 1);
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
