import { Button, Row, Card } from 'react-bootstrap';
import Ticket from '../Ticket/Ticket';

const Board = ({ ...props }) => {
  const { ticket, counter, loadingTicket, tickets, userTicket } = props;
  const status = 'Waiting';

  const statusPerValue = {
    Waiting: { bg: 'bg-yellow-200', badge: 'bg-yellow-500' },
    Running: { bg: 'bg-green-200', badge: 'bg-green-500' },
    Expired: { bg: 'bg-gray-200', badge: 'bg-gray-500' },
  };

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
                  <span className="text-xl badge bg-blue-500">
                    {tickets[0].Value}
                  </span>
                </div>
              )}
              <div className="space-x-4 flex items-center">
                <span className="h3 m-0 p-0">Queue:</span>
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
