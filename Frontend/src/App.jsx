import React, { useState, useEffect } from "react";
import { Send, Bot, User, Moon, Sun, ToggleLeft, ToggleRight } from "lucide-react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [useAI, setUseAI] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          use_ai: useAI,
        }),
      });
      
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Error communicating with the server:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong. Please try again later." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="container">
      <div className="chat-window">
        <div className="header">
          <h1>
            <Bot size={24} />
            Chatbot
          </h1>
          <div className="toggle-container">
            <label className="toggle">
              <input
                type="checkbox"
                checked={useAI}
                onChange={() => setUseAI(!useAI)}
              />
              <span className="toggle-slider"></span>
            </label>
            <span style={{ color: 'white' }}>AI</span>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender}`}
            >
              <div className="avatar">
                {msg.sender === "user" ? (
                  <User size={16} />
                ) : (
                  <Bot size={16} />
                )}
              </div>
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="empty-messages">
              <p>Start a conversation...</p>
            </div>
          )}
        </div>

        <div className="input-area">
          <div className="input-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="send-button" onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;