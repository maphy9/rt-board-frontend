import {
  addObjects,
  changeOrder,
  deleteObjects,
} from "@/state/slices/boardObjectsSlice";
import { goToFuture, goToPast } from "@/state/slices/historySlice";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "./useWebSocket";
import useBoardActions from "./useBoardActions";

export default function useHistory() {
  const history = useSelector((state: RootState) => state.history);
  const dispatch = useDispatch();
  const { sendWebSocketMessage } = useWebSocket();
  const { handleSetProperties } = useBoardActions();

  const hasPast = () => history.historyIndex > 0;

  const hasFuture = () => history.historyIndex < history.history.length;

  const handleGoToFuture = () => {
    if (!hasFuture()) {
      return;
    }

    const historyItem = history.history[history.historyIndex];
    if (historyItem.type === "add") {
      const addedObjects = historyItem.data;
      dispatch(addObjects(addedObjects));
      sendWebSocketMessage("add-objects", addedObjects);
    } else if (historyItem.type === "delete") {
      const deletedObjects = historyItem.data;
      const ids = deletedObjects.map((object) => object.id);
      dispatch(deleteObjects(ids));
      sendWebSocketMessage("delete-objects", ids);
    } else if (historyItem.type === "changeOrder") {
      const { new: newOrder } = historyItem.data;
      dispatch(changeOrder(newOrder));
      sendWebSocketMessage("change-order", newOrder);
    } else if (historyItem.type === "edit") {
      const objects = historyItem.data.map((object) => object.new);
      handleSetProperties(objects);
    }

    dispatch(goToFuture());
  };

  const handleGoToPast = () => {
    if (!hasPast()) {
      return;
    }

    const historyItem = history.history[history.historyIndex - 1];
    if (historyItem.type === "add") {
      const addedObjects = historyItem.data;
      const ids = addedObjects.map((object) => object.id);
      dispatch(deleteObjects(ids));
      sendWebSocketMessage("delete-objects", ids);
    } else if (historyItem.type === "delete") {
      const deletedObjects = historyItem.data;
      dispatch(addObjects(deletedObjects));
      sendWebSocketMessage("add-objects", deletedObjects);
    } else if (historyItem.type === "changeOrder") {
      const { old: oldOrder } = historyItem.data;
      dispatch(changeOrder(oldOrder));
      sendWebSocketMessage("change-order", oldOrder);
    } else if (historyItem.type === "edit") {
      const objects = historyItem.data.map((object) => object.old);
      handleSetProperties(objects);
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
