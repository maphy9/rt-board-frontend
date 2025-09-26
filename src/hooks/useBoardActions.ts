import {
  addObject,
  changePosition,
  setText,
} from "@/state/slices/boardObjectsSlice";
import { addHistoryItem } from "@/state/slices/historySlice";
import BoardObject, {
  boardObjectCleanCopy,
} from "@/types/BoardObjects/boardObject";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "./useWebSocket";
import { RootState } from "@/state/store";

export default function useBoardActions() {
  const dispatch = useDispatch();
  const boardObjects = useSelector((state: RootState) => state.boardObjects);
  const { sendWebSocketMessage } = useWebSocket();

  const addNewObject = (object: BoardObject) => {
    dispatch(addObject(object));
    dispatch(addHistoryItem({ type: "add", data: [object] }));
    sendWebSocketMessage("add", [object]);
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

  return {
    addNewObject,
    changeSelectedPosition,
    changeText,
  };
}
