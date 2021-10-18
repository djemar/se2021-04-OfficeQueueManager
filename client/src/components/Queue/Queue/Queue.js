import { Button, Card } from 'react-bootstrap';
import API from '../../../API';

export const Queue = ({ ...props }) => {
  const {
    service,
    index,
    tickets,
    pairings,
    userTicket,
    setTicket,
    setDirty,
    setLoadingTicket,
    setUserTicket,
  } = props;

  const getTicket = event => {
    event.preventDefault();
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    // todo: Hour - Minute - Second (dayjs ?)
    let value = tickets.slice(-1)[0].Value;

    const ticket = {
      Date: date,
      ServiceID: index + 1,
      State: 'Waiting',
      UserID: 0,
      Value: value + 1,
    };
    API.addTicket(value + 1, 0, index, date, 'not served')
      .then(() => {
        setDirty(true);
        setTicket(ticket);
        pairings.push(index);
        setUserTicket(value + 1);
        setLoadingTicket(false);
      })
      .catch(function (error) {
        alert('An error occurs, try again.');
      });
  };
  return (
    <Card
      className={'border-none bg-white p-6 rounded-lg shadow-lg text-center'}
    >
      <Card.Body>
        <Card.Title className="flex justify-center items-center gap-4">
          <span className="badge bg-green-500">{index + 1}</span>
          <h2 class="text-2xl font-bold text-gray-800 m-0">{service.Name}</h2>
        </Card.Title>
        <Card.Text>
          <p class="text-gray-700">
            User button: displays number of people waiting on this service
          </p>
        </Card.Text>

        <Button disabled={userTicket !== -1} onClick={getTicket}>
          {userTicket === -1 ? 'Get a ticket' : 'Ticket already taken'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Queue;
