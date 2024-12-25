import { createContext, useContext } from "react";
import { useChatState } from "./useChatState";
import { useChatActions } from "./useChatActions";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { messages, message, loading, cameraZoomed } = useChatState();
  const { chat, onMessagePlayed, setCameraZoomed } = useChatActions();

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};