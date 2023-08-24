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
    <div style={{ width: '100%' }}>
      {messages.map((message, index) => (
        <p key={index} className={`message ${message.type}`}>
          {message.text}
        </p>
      ))}
    </div>
  );
}

export default History;
