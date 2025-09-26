import { WebSocketContext } from "@/context/websocketContext";
import { useContext } from "react";

export default function useWebSocket() {
  const websocket = useContext(WebSocketContext);
  if (!websocket) {
    throw new Error("useWebSocket must be used inside a WebSocketProvider");
  }

  const sendWebSocketMessage = (type: string, data: any) => {
    if (websocket.readyState !== WebSocket.OPEN) {
      console.error("WebSocker is not ready yet");
      return;
    }
    const message = JSON.stringify({ type, data });
    websocket.send(message);
  };

  return {
    sendWebSocketMessage,
  };
}
