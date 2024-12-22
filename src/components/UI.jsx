import React, { useRef } from 'react';
import { useChat } from "../hooks/useChat";
import { useAvatar } from "../hooks/useAvatar";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { Header } from "./Header";
import { ChatInput } from "./ChatInput";
import { ChatButton } from "./UI/ChatButton";

export const UI = ({ hidden }) => {
  const input = useRef();
  const { chat, loading, message } = useChat();
  const { showAvatar, setShowAvatar } = useAvatar();
  
  // Initialize keyboard controls
  useKeyboardControls();

  const sendMessage = () => {
    const text = input.current?.value;
    if (text && !loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };

  if (hidden) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
      {showAvatar ? (
        <>
          <Header onClose={() => setShowAvatar(false)} />
          <ChatInput 
            inputRef={input}
            onSend={sendMessage}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading || message}
          />
        </>
      ) : (
        <ChatButton onClick={() => setShowAvatar(true)} />
      )}
    </div>
  );
};