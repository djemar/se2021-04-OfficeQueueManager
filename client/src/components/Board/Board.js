const Board = ({ ...props }) => {
  const { counter, loadingTicket, tickets, userTicket } = props;
  return (
    <>
      <h1>Counter: {counter}</h1>
      <div>
        {userTicket !== -1 ? (
          !loadingTicket ? (
            <>
              <h3>
                Your ticket number is: <strong>{userTicket}</strong>
                <br />
                The current ticket number being served is:{' '}
                <strong>{tickets[0].Value}</strong>
                <hr />
              </h3>
            </>
          ) : (
            <div />
          )
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default Board;
