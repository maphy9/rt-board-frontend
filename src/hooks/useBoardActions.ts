import {
  addObjects,
  changeOrder,
  changePosition,
  deleteObjects,
  resizeObject,
  rotateObject,
  setFontSize,
  setFontStyle,
  setOldObjectState,
  setText,
  toggleIsFlippedHorizontally,
  toggleIsFlippedVertically,
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
import { toRealPoint } from "@/types/point";
import { angleBetweenTwoPoints } from "@/utils/rotation";

export default function useBoardActions() {
  const dispatch = useDispatch();
  const camera = useSelector((state: RootState) => state.camera);
  const input = useSelector((state: RootState) => state.input);
  const boardObjects = useSelector((state: RootState) => state.boardObjects);
  const { sendWebSocketMessage } = useWebSocket();

  const handleAddObjects = (objects) => {
    dispatch(addObjects(objects));
    dispatch(addHistoryItem({ type: "add", data: objects }));
    sendWebSocketMessage("add-objects", objects);
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
          sendWebSocketMessage("change-fontSize", {
            id: newState.id,
            fontSize: (newState as TextObject).fontSize,
          });
          break;
        case "fontColor":
          sendWebSocketMessage("change-fontColor", {
            id: newState.id,
            fontColor: (newState as TextObject).fontColor,
          });
        case "backgroundColor":
          sendWebSocketMessage("change-backgroundColor", {
            id: newState.id,
            backgroundColor: (newState as any).backgroundColor,
          });
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

  const handleDeleteObjects = (boardObjects) => {
    const ids = boardObjects.map((boardObject) => boardObject.id);
    const cleanObjects = boardObjects.map((boardObject) => ({
      ...boardObject,
      isSelected: false,
      isEditing: false,
    }));
    dispatch(addHistoryItem({ type: "delete", data: cleanObjects }));
    dispatch(deleteObjects(ids));
    sendWebSocketMessage("delete-objects", ids);
  };

  const handleChangeOrder = (oldOrder, newOrder) => {
    dispatch(
      addHistoryItem({
        type: "changeOrder",
        data: { old: oldOrder, new: newOrder },
      })
    );
    console.log({ oldOrder, newOrder });
    dispatch(changeOrder(newOrder));
    sendWebSocketMessage("change-order", newOrder);
  };

  const handleRotateObject = () => {
    const mousePosition = toRealPoint(input.mousePosition, camera);
    const id = boardObjects.rotated.id;
    const boardObject = boardObjects.objects[id];
    const rotationAngle = angleBetweenTwoPoints(
      mousePosition,
      boardObject.rotatingPoint
    );
    const data = { id, rotationAngle };
    dispatch(rotateObject(data));
    sendWebSocketMessage("rotate-object", data);
  };

  const handleFlipHorizontally = (boardObject) => {
    const oldState = boardObjectCleanCopy(boardObject);
    const historyData = [
      {
        old: oldState,
        new: {
          ...oldState,
          isFlippedHorizontally: !oldState.isFlippedHorizontally,
        },
      },
    ];
    dispatch(addHistoryItem({ type: "edit", data: historyData }));
    dispatch(toggleIsFlippedHorizontally(boardObject.id));
    sendWebSocketMessage("flip-horizontally", boardObject.id);
  };

  const handleFlipVertically = (boardObject) => {
    const oldState = boardObjectCleanCopy(boardObject);
    const historyData = [
      {
        old: oldState,
        new: {
          ...oldState,
          isFlippedVertically: !oldState.isFlippedVertically,
        },
      },
    ];
    dispatch(addHistoryItem({ type: "edit", data: historyData }));
    dispatch(toggleIsFlippedVertically(boardObject.id));
    sendWebSocketMessage("flip-vertically", boardObject.id);
  };

  return {
    handleAddObjects,
    changeSelectedPosition,
    changeText,
    changeSize,
    changeFontSize,
    changeDifferentFields,
    changeFontStyle,
    handleDeleteObjects,
    handleChangeOrder,
    handleRotateObject,
    handleFlipHorizontally,
    handleFlipVertically,
  };
}
