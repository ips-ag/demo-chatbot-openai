import React, { useState } from "react";
import History from "./History";

function ChatContainer() {
  const [history, setHistory] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendClick = () => {
    // to add the new message to the list of old messages.
    // Then clear the input field.
    setHistory(history.concat(newMessage));
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
