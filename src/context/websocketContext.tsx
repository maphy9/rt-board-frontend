import {
  addObject,
  changePosition,
  resizeObject,
  setText,
} from "@/state/slices/boardObjectsSlice";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  const handleAddEvent = (data) => {
    for (const object of data) {
      dispatch(addObject(object));
    }
  };

  const handleChangePositionEvent = (data) => {
    dispatch(changePosition(data));
  };

  const handleChangeTextEvent = (data) => {
    dispatch(setText(data));
  };

  const handleChangeSizeEvent = (data) => {
    dispatch(resizeObject(data));
  };

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
    setWebsocket(socket);

    socket.onopen = () => console.log("WebSocket open");
    socket.onclose = () => console.log("WebSocket close");
    socket.onerror = (err) => console.log("Websocket error:", err);
    socket.onmessage = ({ data: messageData }) => {
      const { type, data } = JSON.parse(messageData);
      switch (type) {
        case "add":
          handleAddEvent(data);
          break;
        case "change-position":
          handleChangePositionEvent(data);
          break;
        case "change-text":
          handleChangeTextEvent(data);
          break;
        case "change-size":
          handleChangeSizeEvent(data);
          break;
      }
    };

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
