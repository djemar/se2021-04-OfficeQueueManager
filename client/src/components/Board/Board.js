import { Button, Row, Card } from 'react-bootstrap';
import Ticket from '../Ticket/Ticket';
import { useEffect, useState } from 'react';
import API from '../../API';

const Board = ({ ...props }) => {
  const { ticket, counter, loadingTicket, tickets, userTicket } = props;
  const status = 'Waiting';
  const [value, setValue] = useState();
  console.log(tickets);

  const statusPerValue = {
    Waiting: { bg: 'bg-yellow-200', badge: 'bg-yellow-500' },
    Running: { bg: 'bg-green-200', badge: 'bg-green-500' },
    Expired: { bg: 'bg-gray-200', badge: 'bg-gray-500' },
  };

  useEffect(() => {
    //useEffect è un hook che permette di usare i lyfecycle del component. Equivale alla componentDidMount, componentDidUpdate, componentWillUnmount.
    const evaluate = async () => {
      let tick = Object.values(props.groupedTickets);
      let dim = 0;
      let longestQueue;

      for (let i = 0; i < tick.length; i++) {
        if (tick[i].length > dim) {
          dim = tick[i].length;
          longestQueue = tick[i];
        }
      }
      setValue(longestQueue[0].Value);
    };

    evaluate().then(() => {
      props.setDirty(false);
    });
  }, [value, props.dirty]);

  function evaluate() {}

  return (
    <>
      <h2>Queue Board</h2>
      {userTicket !== -1 && !loadingTicket && ticket && (
        <>
          <Ticket ticket={ticket} status="Waiting" userTicket={userTicket} />
        </>
      )}
      <Card
        className={'border-none bg-white p-6 rounded-lg shadow-lg text-center'}
      >
        <Card.Body>
          <Row className="w-full flex justify-left text-center">
            <p className="m-0 text-center flex justify-between items-center space-x-2">
              {tickets.length !== 0 && (
                <div className="space-x-4 flex items-center">
                  <span className="h3 m-0 p-0">We are serving:</span>
                  <span className="text-xl badge bg-blue-500">{value}</span>
                </div>
              )}
              <div className="space-x-4 flex items-center">
                <span className="h3 m-0 p-0">Counter:</span>
                <span className="text-xl badge bg-gray-500">{counter}</span>
              </div>
            </p>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Board;
