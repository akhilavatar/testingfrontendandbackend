import { useState, useEffect } from "react";

export const useChatState = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return {
    messages,
    setMessages,
    message,
    loading,
    setLoading,
    cameraZoomed,
    setCameraZoomed,
  };
};