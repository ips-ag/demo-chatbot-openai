import { useEffect, useRef } from 'react';
import './History.css';

export enum MessageType {
  User = 'user',
  Assistant = 'assistant',
}

export type Message = {
  type: MessageType;
  text: string;
};

interface Props {
  messages: Message[];
}

function History(props: Props) {
  const { messages } = props;
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTo({
        top: historyRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div ref={historyRef} className="history">
      {messages.map((message, index) => (
        <p key={index} className={`message ${message.type}`}>
          {message.text}
        </p>
      ))}
    </div>
  );
}

export default History;
