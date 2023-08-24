import './History.css';

export type Message = {
  type: 'request' | 'response';
  text: string;
};

interface Props {
  messages: Message[];
}

function History(props: Props) {
  const { messages } = props;
  return (
    <>
      {messages.map((message, index) => (
        <p key={index} className={`message ${message.type}`}>
          {message.text}
        </p>
      ))}
    </>
  );
}

export default History;
