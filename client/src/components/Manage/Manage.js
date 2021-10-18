import { Button, Row, Card } from 'react-bootstrap';
import API from '../../API';

const Manage = ({ ...props }) => {
  const {
    services,
    counter,
    user,
    userTicket,
    tickets,
    setDirty,
    setLoadingTicket,
    setUserTicket,
    pairings,
    name,
  } = props;
  let tick;
  let longestQueue;
  const getTickets = async () => {
    tick = await API.getTicketsByServiceId();
  };
  getTickets();

  function handleClick() {
    let arrsTicket = Object.values(tick);

    let dim = 0;

    arrsTicket.forEach(x => {
      if (x.length > dim) {
        dim = x.length;
        longestQueue = x;
      }
    });
    console.log(longestQueue[0]);
  }

  return (
    <>
      <Row className="w-full flex justify-center text-center">
        <p className="text-center flex justify-center items-center space-x-2">
          <span className="h1 ">Welcome {name}! </span>
          <span className="font-bold text-gray-500">
            {user === 1 ? '(Officier)' : '(Admin)'}
          </span>
        </p>
      </Row>
      <Card
        className={'border-none bg-white p-6 rounded-lg shadow-lg text-center'}
      >
        <Card.Body>
          <Row className="w-full flex justify-left text-center">
            <p className="m-0 text-center flex justify-between items-center space-x-2">
              <div className="space-x-4 flex items-center">
                <span className="h3 m-0 p-0">Working at counter:</span>
                <span className="text-xl badge bg-green-500">{counter}</span>
              </div>

              <Button onClick={handleClick} variant="warning" size="lg">
                Serve next client
              </Button>
            </p>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Manage;
