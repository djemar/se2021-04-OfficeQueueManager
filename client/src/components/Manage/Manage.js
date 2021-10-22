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

  function handleClick() {
    let tick = Object.values(props.groupedTickets);
    let dim = 0;
    let longestQueue;

    for (let i = 0; i < tick.length; i++) {
      if (tick[i].length > dim) {
        dim = tick[i].length;
        longestQueue = tick[i];
      }
    }

    const updateTicket = async () => {
      await API.updateTicket(longestQueue[0].ID);
    };
    updateTicket().then(() => {
      setDirty(true);
    });
    alert('Ticket removed from the queue: Ticket n°' + longestQueue[0].Value);
  }

  return (
    <>
      <Row className="w-full flex justify-center text-center">
        <p className="text-center flex justify-center items-center space-x-2">
          <span className="h1 ">Welcome {name}! </span>
          <span className="font-bold text-gray-500">
            {user === 1 ? '(Officer)' : '(Admin)'}
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

              <Button
                onClick={event => {
                  event.preventDefault();
                  // TODO: find next client according to the algo
                  handleClick();
                }}
                variant="warning"
                size="lg"
              >
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
