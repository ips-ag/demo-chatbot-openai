import React, { useState } from "react";
import History from "./History";
import { getCompletion } from "./services";

function ChatContainer() {
  const [history, setHistory] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleSendClick();
    }
  };

  const handleSendClick = async () => {
    // to add the new message to the list of old messages.
    // Then clear the input field.
    if (newMessage === "") return;
    const response = await getCompletion(newMessage);
    setHistory(history.concat(newMessage).concat(response));
    setNewMessage("");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", minWidth: "70vw" }}>
      {/* Old chat messages */}
      <History messages={history} />

      {/* New message input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Type your message here"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
        />
        <button
          onClick={handleSendClick}
          style={{
            marginLeft: "10px",
            padding: "10px",
            fontSize: "16px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;
