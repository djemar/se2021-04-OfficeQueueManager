import QueueDisplayItem from '../QueueDisplayItem/QueueDisplayItem';

const QueueDisplay = ({ ...props }) => {
  const { services } = props;

  const queue = services.map((service, index) => (
    <QueueDisplayItem key={index} index={index} service={service} />
  ));
  return <div className="grid grid-cols-3 gap-4">{queue}</div>;
};

export default QueueDisplay;
