import React, { useState } from 'react';
import History, { Message } from './History';
import { getCompletion } from '../services';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100vh',
        width: '95%',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Old chat messages */}
      <History messages={history} />

      {/* New message input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '80%',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Type your message here"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
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
