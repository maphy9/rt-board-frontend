import {
  addObject,
  changeOrder,
  setProperties,
} from "@/state/slices/boardObjectsSlice";
import { goToFuture, goToPast } from "@/state/slices/historySlice";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "./useWebSocket";

export default function useHistory() {
  const history = useSelector((state: RootState) => state.history);
  const dispatch = useDispatch();
  const { sendWebSocketMessage } = useWebSocket();

  const hasPast = () => history.historyIndex > 0;

  const hasFuture = () => history.historyIndex < history.history.length;

  const handleGoToFuture = () => {
    if (!hasFuture()) {
      return;
    }

    const historyItem = history.history[history.historyIndex];
    if (historyItem.type === "add") {
      for (const boardObject of historyItem.data) {
        dispatch(addObject(boardObject));
        sendWebSocketMessage("add", [boardObject]);
      }
    } else if (historyItem.type === "delete") {
      for (const boardObject of historyItem.data) {
        console.log("delete");
      }
    } else if (historyItem.type === "changeOrder") {
      const { new: newOrder } = historyItem.data;
      dispatch(changeOrder(newOrder));
    } else if (historyItem.type === "edit") {
      for (const objectStates of historyItem.data) {
        dispatch(setProperties(objectStates.new));
      }
    }

    dispatch(goToFuture());
  };

  const handleGoToPast = () => {
    if (!hasPast()) {
      return;
    }

    const historyItem = history.history[history.historyIndex - 1];
    if (historyItem.type === "add") {
      for (const boardObject of historyItem.data) {
        console.log("delete");
      }
    } else if (historyItem.type === "delete") {
      for (const boardObject of historyItem.data) {
        dispatch(addObject(boardObject));
        sendWebSocketMessage("add", [boardObject]);
      }
    } else if (historyItem.type === "changeOrder") {
      const { old: oldOrder } = historyItem.data;
      dispatch(changeOrder(oldOrder));
    } else if (historyItem.type === "edit") {
      for (const objectStates of historyItem.data) {
        dispatch(setProperties(objectStates.old));
      }
    }

    dispatch(goToPast());
  };

  return {
    hasPast,
    hasFuture,
    handleGoToFuture,
    handleGoToPast,
  };
}
