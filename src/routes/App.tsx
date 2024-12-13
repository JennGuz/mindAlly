import { useEffect, useState } from "react";
import "./App.css";
import { ChatInput } from "../components/ChatInput";
import { Message } from "../components/ChatMessages";
import { socket } from "../utils/socket";
import { Tmessage } from "../utils/types";
import { ChatHeader } from "../components/ChatHeader";

const defaultMessages: Tmessage[] = [
  {
    type: "assistant",
    text: "Hola, ¿cómo te sientes hoy? 😊",
    prediction: null,
  },
  {
    type: "assistant",
    text: "Puedes contarme cómo te sientes, y te ayudaré a sentirte mejor.",
    prediction: null,
  },
];

function App() {
  const [messages, setMessages] = useState<Tmessage[]>([]);

  const loadDefaultMessages = () => {
    defaultMessages.forEach((message, index) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, message]);
      }, index * 1000);
    });
  };

  useEffect(() => {
    loadDefaultMessages();

    socket.on("prediction", (data) => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        lastMessage.prediction = data.prediction;
        prev[prev.length - 1] = lastMessage;
        return [...prev];
      });
    });

    socket.on("advice", (data) => {
      addMessage({
        text: data.advice,
        type: "assistant",
        prediction: null,
      });
    });

    return () => {
      socket.off("prediction");
      socket.off("advice");
    };
  }, []);

  const addMessage = (message: Tmessage) => {
    setMessages((prev) => [...prev, message]);

    if (message.type === "user") {
      socket.emit("message", {
        message,
        previous_messages: messages,
      });
    }
  };

  return (
    <>
      <ChatHeader />
      <main id="app">
        <div className="MessagesContainer">
          {messages.map((message) => {
            return <Message {...message} />;
          })}
        </div>
        <ChatInput addMessage={addMessage} />
      </main>
    </>
  );
}

export default App;
