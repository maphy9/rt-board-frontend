import {
  addObjects,
  changeOrder,
  changePosition,
  deleteObjects,
  resizeObject,
  rotateObject,
  setBackgroundColor,
  setFontColor,
  setFontSize,
  setFontStyle,
  setProperties,
  setText,
  toggleIsFlippedHorizontally,
  toggleIsFlippedVertically,
} from "@/state/slices/boardObjectsSlice";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const WebSocketContext = createContext<WebSocket | null>(null);

const MESSAGE_HANDLERS = {
  "add-objects": addObjects,
  "change-position": changePosition,
  "change-text": setText,
  "change-size": resizeObject,
  "change-fontSize": setFontSize,
  "change-fontStyle": setFontStyle,
  "change-fontColor": setFontColor,
  "delete-objects": deleteObjects,
  "change-order": changeOrder,
  "change-backgroundColor": setBackgroundColor,
  "rotate-object": rotateObject,
  "flip-horizontally": toggleIsFlippedHorizontally,
  "flip-vertically": toggleIsFlippedVertically,
  "set-properties": setProperties,
};

export const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);
    setWebsocket(socket);

    socket.onopen = () => console.log("WebSocket open");
    socket.onclose = () => console.log("WebSocket close");
    socket.onerror = (err) => console.log("Websocket error:", err);
    socket.onmessage = ({ data: messageData }) => {
      const { type, data } = JSON.parse(messageData);
      const handler = MESSAGE_HANDLERS[type];
      if (handler) {
        dispatch(handler(data));
      }
    };

    return () => socket.close(1000, "Component unmounting");
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
