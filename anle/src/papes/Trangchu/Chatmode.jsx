import React, { useState } from "react";
import "./Chatmode.scss";

function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMode, setChatMode] = useState("chatbot"); // Lưu trạng thái chế độ chat (chatbot hoặc tư vấn)
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "chatbot",
      message: "Xin chào! Tôi là Chatbot. Bạn cần hỗ trợ gì không?",
    },
  ]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const input = event.target.elements.messageInput.value;
    if (input.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: "user", message: input },
      ]);
      event.target.elements.messageInput.value = "";
    }
  };

  return (
    <div className="chat-widget">
      <button className="chat-bubble" onClick={() => setIsChatOpen(!isChatOpen)}>
        💬
      </button>

      {isChatOpen && (
        <div className="chat-box">
          {/* Chat Header */}
          <div className="chat-header">
            <h3 style={{ fontSize: "23px", marginLeft: "20px" }}>Hỗ trợ trực tuyến</h3>
            <button onClick={() => setIsChatOpen(false)} className="close-button">
              ✖
            </button>
          </div>

          {/* Chat Mode Options */}
          <div className="chat-options">
            <button
              style={{ backgroundColor: "#007bff", marginRight: "10px" }}
              onClick={() => {
                setChatMode("chatbot");
                setChatMessages([
                  ...chatMessages,
                  {
                    sender: "chatbot",
                    message: "Xin chào! Tôi là Chatbot. Bạn cần hỗ trợ gì không?",
                  },
                ]);
              }}
            >
              Chatbot
            </button>
            <button
              style={{ backgroundColor: "#007bff" }}
              onClick={() => {
                setChatMode("tuvan");
                setChatMessages([
                  ...chatMessages,
                  {
                    sender: "chatbot",
                    message: "Chào bạn, tôi là nhân viên tư vấn. Bạn cần giúp gì?",
                  },
                ]);
              }}
            >
              Tư vấn
            </button>
          </div>

          {/* Chat Content */}
          <div className="chat-content">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === "chatbot" ? "chatbot-message" : "user-message"
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form className="chat-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              name="messageInput"
              placeholder="Nhập tin nhắn..."
            />
            <button type="submit">Gửi</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;