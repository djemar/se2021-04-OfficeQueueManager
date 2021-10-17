import { Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import API from '../../../API';

export const Queue = ({ ...props }) => {
  const {
    item,
    index,
    tickets,
    pairings,
    userTicket,
    setDirty,
    setLoadingTicket,
    setUserTicket,
  } = props;
  return (
    <Card
      className={'border-none bg-white p-6 rounded-lg shadow-lg text-center'}
    >
      <Card.Body>
        <Card.Title className="flex justify-center items-center gap-4">
          <span className="badge bg-green-500">{index + 1}</span>
          <h2 class="text-2xl font-bold text-gray-800 m-0">{item.Name}</h2>
        </Card.Title>
        <Card.Text>
          <p class="text-gray-700">
            User button: displays number of people waiting on this service
          </p>
        </Card.Text>

        <Button
          disabled={userTicket !== -1}
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
            let value = tickets.slice(-1)[0].Value;

            API.addTicket(value + 1, 0, index, date, 'not served')
              .then(() => {
                setDirty(true);
                pairings.push(index);
                setLoadingTicket(false);
                setUserTicket(value + 1);
                <Redirect to="/board" />;
              })
              .catch(function (error) {
                alert('An error occurs, try again.');
              });
          }}
        >
          {userTicket === -1 ? 'Get a ticket' : 'Ticket already taken'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Queue;
