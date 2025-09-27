import {
  addObject,
  changePosition,
  resizeObject,
  setFontSize,
  setFontStyle,
  setOldObjectState,
  setText,
} from "@/state/slices/boardObjectsSlice";
import { addHistoryItem } from "@/state/slices/historySlice";
import BoardObject, {
  boardObjectCleanCopy,
} from "@/types/BoardObjects/boardObject";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "./useWebSocket";
import { RootState } from "@/state/store";
import { resizeBoardObject } from "@/utils/resizing";
import TextObject from "@/types/BoardObjects/textObject";
import { getDifferentFields } from "@/utils/objects";

export default function useBoardActions() {
  const dispatch = useDispatch();
  const boardObjects = useSelector((state: RootState) => state.boardObjects);
  const { sendWebSocketMessage } = useWebSocket();

  const addNewObject = (object: BoardObject) => {
    dispatch(addObject(object));
    dispatch(addHistoryItem({ type: "add", data: [object] }));
    sendWebSocketMessage("add-object", [object]);
  };

  const changeSelectedPosition = (dx, dy) => {
    const objectIds = Object.keys(boardObjects.selected);
    const data = { objectIds, dx, dy };
    dispatch(changePosition(data));
    sendWebSocketMessage("change-position", data);
  };

  const changeText = (id, text) => {
    const textObject = boardObjects.objects[id];
    const cleanCopy = boardObjectCleanCopy(textObject);
    const historyData = [
      {
        old: cleanCopy,
        new: { ...cleanCopy, text },
      },
    ];
    const data = { id, text };
    dispatch(setText(data));
    dispatch(addHistoryItem({ type: "edit", data: historyData }));
    sendWebSocketMessage("change-text", data);
  };

  const changeSize = (dx, dy) => {
    const resized = boardObjects.resized;
    const boardObject = boardObjects.objects[resized.id];
    const { position, size } = resizeBoardObject(boardObject, dx, dy);
    const data = { id: boardObject.id, position, size };
    dispatch(resizeObject(data));
    sendWebSocketMessage("change-size", data);
  };

  const changeFontSize = (id, newFontSize) => {
    const textObject = boardObjects.objects[id] as TextObject;
    const oldState = boardObjectCleanCopy(textObject);
    const historyData = [
      { old: oldState, new: { ...oldState, fontSize: newFontSize } },
    ];
    dispatch(addHistoryItem({ type: "edit", data: historyData }));
    const data = { id, fontSize: newFontSize };
    dispatch(setFontSize(data));
    sendWebSocketMessage("change-fontSize", data);
  };

  const changeDifferentFields = (
    oldState: BoardObject,
    newState: BoardObject
  ) => {
    dispatch(setOldObjectState(null));
    const historyData = [{ old: oldState, new: newState }];
    dispatch(addHistoryItem({ type: "edit", data: historyData }));
    const updatedKeys = getDifferentFields(oldState, newState);
    for (const updatedKey of updatedKeys) {
      switch (updatedKey) {
        case "fontSize":
          changeFontSize(newState.id, (newState as TextObject).fontSize);
          break;
      }
    }
  };

  const changeFontStyle = (textObject, newFontStyle) => {
    const oldState = boardObjectCleanCopy(textObject);
    const historyData = [
      { old: oldState, new: { ...oldState, fontStyle: newFontStyle } },
    ];
    dispatch(addHistoryItem({ type: "edit", data: historyData }));
    dispatch(setFontStyle({ id: textObject.id, fontStyle: newFontStyle }));
    const data = { id: textObject.id, fontStyle: newFontStyle };
    sendWebSocketMessage("change-fontStyle", data);
  };

  return {
    addNewObject,
    changeSelectedPosition,
    changeText,
    changeSize,
    changeFontSize,
    changeDifferentFields,
    changeFontStyle,
  };
}
