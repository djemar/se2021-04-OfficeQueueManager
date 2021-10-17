import { Button } from 'react-bootstrap';
import QueueDisplay from './QueueDisplay/QueueDisplay';

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

  return (
    <>
      <h1>Welcome {name}!</h1>
      <h2>Working at counter {counter}.</h2>
      <Button
        onClick={event => {
          event.preventDefault();
          // TODO: find next client according to the algo
        }}
        variant="warning"
        size="lg"
      >
        Serve the next client.
      </Button>
      <hr />
      <QueueDisplay
        services={services}
        counter={counter}
        user={user}
        userTicket={userTicket}
        tickets={tickets}
        setDirty={setDirty}
        setLoadingTicket={setLoadingTicket}
        setUserTicket={setUserTicket}
        pairings={pairings}
      />
    </>
  );
};

export default Manage;
