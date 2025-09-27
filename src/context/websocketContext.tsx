import {
  addObject,
  changePosition,
  deleteObjects,
  resizeObject,
  setFontColor,
  setFontSize,
  setFontStyle,
  setText,
} from "@/state/slices/boardObjectsSlice";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  const handleAddObject = (data) => {
    for (const object of data) {
      dispatch(addObject(object));
    }
  };

  const handleChangePosition = (data) => {
    dispatch(changePosition(data));
  };

  const handleChangeText = (data) => {
    dispatch(setText(data));
  };

  const handleChangeSize = (data) => {
    dispatch(resizeObject(data));
  };

  const handleChangeFontSize = (data) => {
    dispatch(setFontSize(data));
  };

  const handleChangeFontStyle = (data) => {
    dispatch(setFontStyle(data));
  };

  const handleChangeFontColor = (data) => {
    dispatch(setFontColor(data));
  };

  const handleDeleteObjects = (data) => {
    dispatch(deleteObjects(data));
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
        case "add-object":
          handleAddObject(data);
          break;
        case "change-position":
          handleChangePosition(data);
          break;
        case "change-text":
          handleChangeText(data);
          break;
        case "change-size":
          handleChangeSize(data);
          break;
        case "change-fontSize":
          handleChangeFontSize(data);
          break;
        case "change-fontStyle":
          handleChangeFontStyle(data);
          break;
        case "change-fontColor":
          handleChangeFontColor(data);
          break;
        case "delete-objects":
          handleDeleteObjects(data);
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
