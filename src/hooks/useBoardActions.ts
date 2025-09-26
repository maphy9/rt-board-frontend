import { addObject } from "@/state/slices/boardObjectsSlice";
import { addHistoryItem } from "@/state/slices/historySlice";
import BoardObject from "@/types/BoardObjects/boardObject";
import { useDispatch } from "react-redux";
import useWebSocket from "./useWebSocket";

export default function useBoardActions() {
  const dispatch = useDispatch();
  const { sendWebSocketMessage } = useWebSocket();

  const addNewObject = (object: BoardObject) => {
    dispatch(addObject(object));
    dispatch(addHistoryItem({ type: "add", data: [object] }));
    sendWebSocketMessage("add", [object]);
  };

  return {
    addNewObject,
  };
}
