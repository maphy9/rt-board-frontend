import { addObject, changePosition } from "@/state/slices/boardObjectsSlice";
import { addHistoryItem } from "@/state/slices/historySlice";
import BoardObject from "@/types/BoardObjects/boardObject";
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

  return {
    addNewObject,
    changeSelectedPosition,
  };
}
