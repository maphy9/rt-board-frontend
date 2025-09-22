import React, { createContext, useEffect, useRef } from "react";

export const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider = ({ children }) => {
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
    webSocketRef.current = socket;

    socket.onopen = () => console.log("WebSocket open");
    socket.onclose = () => console.log("WebSocket close");
    socket.onerror = (err) => console.log("Websocket error:", err);
    socket.onmessage = (event) => console.log(event);

    return () => socket.close();
  }, []);

  return (
    <WebSocketContext.Provider value={webSocketRef.current}>
      {children}
    </WebSocketContext.Provider>
  );
};
