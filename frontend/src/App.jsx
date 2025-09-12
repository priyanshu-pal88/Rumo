import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";
import LoadingDots from "./components/Loading";

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    socket.emit("ai-message", input);
    setInput("");
  };

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(socketInstance);

    socketInstance.on("ai-message-response", (response) => {
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false)
    });
  }, []);

  return (
    <div className="chat-app">
      <header className="chat-header">
        <img src="./logo.png" alt="AI Chat" style={{ width: '32px', height: '32px', marginRight: '12px' }} />
        <span>Rumo</span>

      </header>

      <main className="chat-body">
        <div className="messages">
          {messages.map((m) => (
            <div key={m.id} className={`message ${m.sender}`}>
              {m.text}
            </div>
          ))}
          {isLoading && <LoadingDots />}
        </div>
      </main>

      <footer className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </footer>
    </div>
  );
}

export default App;
