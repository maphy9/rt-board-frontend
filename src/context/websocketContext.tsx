import React, { createContext, useEffect, useState } from "react";

export const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider = ({ children }) => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
    setWebsocket(socket);

    socket.onopen = () => console.log("WebSocket open");
    socket.onclose = () => console.log("WebSocket close");
    socket.onerror = (err) => console.log("Websocket error:", err);
    socket.onmessage = (event) => console.log(event);

    return () => socket.close();
  }, []);

  if (websocket === null) {
    return <></>;
  }

  return (
    <WebSocketContext.Provider value={websocket}>
      {children}
    </WebSocketContext.Provider>
  );
};
