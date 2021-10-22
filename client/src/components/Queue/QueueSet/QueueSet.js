import { Queue } from '..';

const QueueSet = ({ ...props }) => {
  const {
    services,
    counter,
    user,
    userTicket,
    tickets,
    setTicket,
    setDirty,
    setLoadingTicket,
    setUserTicket,
    pairings,
  } = props;
  /* This function is used to understand which queues are needed for this specific counter */
  //let [services, setServices] = useState([]);

  /*const allServices = [
    {
      ID: 1,
      Counter1: 1,
      Counter2: 1,
      Counter3: 1,
      Counter4: 0,
      Name: 'Bank account',
    },
    {
      ID: 2,
      Counter1: 1,
      Counter2: 1,
      Counter3: 0,
      Counter4: 0,
      Name: 'Bank account',
    },
    {
      ID: 3,
      Counter1: 1,
      Counter2: 1,
      Counter3: 0,
      Counter4: 1,
      Name: 'Postepay',
    },
    {
      ID: 4,
      Counter1: 1,
      Counter2: 0,
      Counter3: 1,
      Counter4: 0,
      Name: 'Postal savings',
    },
  ];*/

  /* todo: fetch to the DB in order to get the services of this counter */
  /* let currentServices = allServices;
  // currentServices should contain only the services of the current counter (an officer should be associated to a counter TODO)
  currentServices = currentServices.filter(item => {
    switch (counter) {
      case 1:
        return item.Counter1;
      case 2:
        return item.Counter2;
      case 3:
        return item.Counter3;
      case 4:
        return item.Counter4;
      default:
        console.log("The current counter doesn't exist.");
        return false;
    }
  });

  if (!user) {
    currentServices = allServices; // user can see all the queues
  }
 */
  const queue = services.map((service, index) => (
    <Queue
      key={index}
      counter={counter}
      user={user}
      userTicket={userTicket}
      setUserTicket={setUserTicket}
      setLoadingTicket={setLoadingTicket}
      pairings={pairings}
      tickets={tickets}
      setTickets={tickets}
      setTicket={setTicket}
      setDirty={setDirty}
      index={index}
      service={service}
    />
  ));
  return <div className="grid grid-cols-3 gap-4">{queue}</div>;
};

export default QueueSet;
