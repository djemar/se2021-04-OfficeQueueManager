import { Card, Row } from 'react-bootstrap';

const Ticket = ({ ...props }) => {
  const { status, userTicket, ticket } = props;
  const { Date, ID, ServiceID, State, UserID, Value } = ticket;

  const statusPerValue = {
    Waiting: { bg: 'bg-yellow-200', badge: 'bg-yellow-500' },
    Running: { bg: 'bg-green-200', badge: 'bg-green-500' },
    Expired: { bg: 'bg-gray-200', badge: 'bg-gray-500' },
  };
  return (
    <div className="border-b-2 border-gray-100 pb-4 my-4">
      <Card
        className={`border-none ${statusPerValue[State].bg} p-6 rounded-lg shadow-lg text-center`}
      >
        <Card.Body>
          <Row className="w-full flex justify-left text-center">
            <p className="m-0 text-center flex justify-between items-center space-x-2">
              <div className="space-x-4 flex items-center">
                <span className="h3 m-0 p-0">Your ticket number is:</span>
                <span
                  className={`text-xl badge ${statusPerValue[State].badge}`}
                >
                  {userTicket}
                </span>
              </div>
              <div className="space-x-4 flex items-center">
                <span className="h3 m-0 p-0">Service:</span>
                <span className="text-xl badge bg-white text-black">
                  {ServiceID}
                </span>
              </div>
              <div className="space-x-4 flex items-center">
                <span className="h3 m-0 p-0">Status:</span>
                <span className="text-xl badge bg-white text-black">
                  {State}
                </span>
              </div>
            </p>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Ticket;
