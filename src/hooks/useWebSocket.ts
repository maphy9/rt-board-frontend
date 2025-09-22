import { WebSocketContext } from "@/context/websocketContext";
import { useContext } from "react";

export default function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used inside a WebSocketProvider");
  }
  return context;
}
