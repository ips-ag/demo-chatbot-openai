interface Props {
  messages: string[];
}

function History(props: Props) {
  const { messages } = props;
  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}

export default History;
