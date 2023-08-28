import React, { useEffect, useState } from 'react';
import History, { Message, MessageType } from './History';
import { getCompletion } from '../services';
import './ChatContainer.css';

function ChatContainer() {
  const [history, setHistory] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    console.log('Running initial effect');
    const getInitialCompletion = async () => {
      setIsSending(true);
      const response = await getCompletion([]);
      setHistory((prevHistory) => [...prevHistory, { type: MessageType.Assistant, text: response }]);
      setIsSending(false);
    };
    getInitialCompletion();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Handling input change');
    setNewMessage(event.target.value);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Handling Enter pressed');
      await handleSendClick();
    }
  };

  const handleSendClick = async () => {
    if (newMessage === '') return;
    console.log('Handling send click');
    setIsSending(true);
    const userMessage: Message = { type: MessageType.User, text: newMessage };
    const messages: Message[] = [...history, userMessage];
    setHistory((prevHistory) => [...prevHistory, userMessage]);
    setNewMessage('');
    const response = await getCompletion(messages);
    setHistory((prevHistory) => [...prevHistory, { type: MessageType.Assistant, text: response }]);
    setIsSending(false);
  };

  return (
    <div className="chat-container">      
      <History messages={history} />      
      <div className="text-input">
        <input
          type="text"
          placeholder="Type your message here"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendClick} disabled={isSending}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;
