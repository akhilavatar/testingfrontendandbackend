const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useChatApi = () => {
  const sendMessage = async (message) => {
    try {
      const response = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.messages;
    } catch (error) {
      console.error("Chat API Error:", error);
      throw error;
    }
  };

  return { sendMessage };
};