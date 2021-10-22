import { Button, Card } from 'react-bootstrap';

export const QueueDisplayItem = ({ ...props }) => {
  const { service, index } = props;
  return (
    <>
      <Card
        className={'border-none bg-white p-6 rounded-lg shadow-lg text-center'}
      >
        <Card.Body>
          <Card.Title className="flex justify-center items-center gap-4">
            <span className="badge bg-green-500">{index + 1}</span>
            <h2 class="text-2xl font-bold text-gray-800 m-0">{service.Name}</h2>
          </Card.Title>
          <Card.Text>
            <p class="text-gray-700">Officier button: displays top tickets</p>
          </Card.Text>

          <Button>Button</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default QueueDisplayItem;
