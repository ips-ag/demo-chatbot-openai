import React, { useState } from 'react';
import History, { Message } from './History';
import { getCompletion } from '../services';
import './ChatContainer.css';

function ChatContainer() {
  const [history, setHistory] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleSendClick();
    }
  };

  const handleSendClick = async () => {
    if (newMessage === '') return;
    const response = await getCompletion(newMessage);
    setHistory((prevHistory) => [
      ...prevHistory,
      { type: 'request', text: newMessage },
      { type: 'response', text: response },
    ]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      {/* Old chat messages */}
      <div className="history">
        <History messages={history} />
      </div>

      {/* New message input */}
      <div className="text-input">
        <input
          type="text"
          placeholder="Type your message here"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ width: '80%', minWidth: 200, padding: '10px', fontSize: '16px' }}
        />
        <button
          onClick={handleSendClick}
          style={{
            marginLeft: '10px',
            padding: '10px',
            fontSize: '16px',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;
