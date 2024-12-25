import { useChatState } from "./useChatState";
import { useChatApi } from "../services/chatApi";

export const useChatActions = () => {
  const { setMessages, setLoading, setCameraZoomed } = useChatState();
  const { sendMessage } = useChatApi();

  const chat = async (message) => {
    setLoading(true);
    const resp = await sendMessage(message);
    setMessages((messages) => [...messages, ...resp]);
    setLoading(false);
  };

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  return {
    chat,
    onMessagePlayed,
    setCameraZoomed,
  };
};