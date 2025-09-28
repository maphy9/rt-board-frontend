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

export const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
    setWebsocket(socket);

    socket.onopen = () => console.log("WebSocket open");
    socket.onclose = () => console.log("WebSocket close");
    socket.onerror = (err) => console.log("Websocket error:", err);
    socket.onmessage = ({ data: messageData }) => {
      const { type, data } = JSON.parse(messageData);
      switch (type) {
        case "add-objects":
          dispatch(addObjects(data));
          break;
        case "change-position":
          dispatch(changePosition(data));
          break;
        case "change-text":
          dispatch(setText(data));
          break;
        case "change-size":
          dispatch(resizeObject(data));
          break;
        case "change-fontSize":
          dispatch(setFontSize(data));
          break;
        case "change-fontStyle":
          dispatch(setFontStyle(data));
          break;
        case "change-fontColor":
          dispatch(setFontColor(data));
          break;
        case "delete-objects":
          dispatch(deleteObjects(data));
          break;
        case "change-order":
          dispatch(changeOrder(data));
          break;
        case "change-backgroundColor":
          dispatch(setBackgroundColor(data));
          break;
        case "rotate-object":
          dispatch(rotateObject(data));
          break;
        case "flip-horizontally":
          dispatch(toggleIsFlippedHorizontally(data));
          break;
        case "flip-vertically":
          dispatch(toggleIsFlippedVertically(data));
          break;
        case "set-properties":
          dispatch(setProperties(data));
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
