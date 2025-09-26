import { addOffset, toRealPoint } from "@/types/point";
import {
  addObject,
  clearSelection,
  deleteSelected,
  selectObject,
} from "@/state/slices/boardObjectsSlice";
import { setSelectedTool } from "@/state/slices/toolboxSlice";
import { RootState } from "@/state/store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoardObject } from "@/types/BoardObjects/boardObject";
import { addHistoryItem } from "@/state/slices/historySlice";
import useHistory from "./useHistory";
import { copyObjectToClipboard } from "@/utils/clipboard";
import getID from "@/utils/id";
import { OBJECT_COPY_MARGIN } from "@/constants/boardObjectConstants";
import useWebSocket from "./useWebSocket";
import useBoardActions from "./useBoardActions";

function getType(types: readonly string[], type: string) {
  return types.find((t) => t.startsWith(type));
}

export default function useKeyboard() {
  const camera = useSelector((state: RootState) => state.camera);
  const input = useSelector((state: RootState) => state.input);
  const boardObjects = useSelector((state: RootState) => state.boardObjects);
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const { sendWebSocketMessage } = useWebSocket();
  const { addNewObject } = useBoardActions();

  const { handleGoToFuture, handleGoToPast } = useHistory();

  const historyRef = useRef({ handleGoToPast, handleGoToFuture });
  useEffect(() => {
    historyRef.current = { handleGoToPast, handleGoToFuture };
  }, [handleGoToPast, handleGoToFuture]);

  const cameraRef = useRef(camera);
  const mousePosition = useRef(input.mousePosition);
  const boardObjectsRef = useRef(boardObjects);
  useEffect(() => {
    mousePosition.current = input.mousePosition;
    boardObjectsRef.current = boardObjects;
    cameraRef.current = camera;
  }, [input.mousePosition, boardObjects, camera]);

  function handleEscape() {
    dispatch(clearSelection());
    dispatch(setSelectedTool("cursor"));
  }

  async function handlePaste() {
    for (const id in boardObjectsRef.current.selected) {
      const boardObject = boardObjectsRef.current.objects[id];
      if (boardObject.isEditing) {
        return;
      }
    }

    const clipboardItems = await navigator.clipboard.read();
    if (clipboardItems.length === 0) {
      return;
    }

    const clipboardItem = clipboardItems[0];

    const textType = getType(clipboardItem.types, "text/plain");
    if (textType !== undefined) {
      const blob = await clipboardItem.getType(textType);
      const text = await blob.text();
      const json = JSON.parse(text);

      if (json["__customType"] !== "boardObjects") {
        return;
      }

      const objects = json["data"];
      const copies = [];
      for (const object of objects) {
        const copy = {
          ...JSON.parse(JSON.stringify(object)),
          id: getID(),
          isSelected: false,
          isEdited: false,
          position: addOffset(object.position, OBJECT_COPY_MARGIN),
        };
        dispatch(addObject(copy));
        copies.push(copy);
      }

      dispatch(addHistoryItem({ type: "add", data: copies }));
      sendWebSocketMessage("add", copies);

      dispatch(clearSelection());
      for (const copy of copies) {
        dispatch(selectObject(copy.id));
      }

      return;
    }

    const imageType = getType(clipboardItem.types, "image");
    if (imageType !== undefined) {
      const blob = await clipboardItem.getType(imageType);
      const src = URL.createObjectURL(blob);
      const position = toRealPoint(mousePosition.current, cameraRef.current);
      const imageObject = await createBoardObject(
        "image",
        position,
        theme,
        src
      );

      addNewObject(imageObject);
    }
  }

  function handleCopy(event) {
    const boardObjects = boardObjectsRef.current;

    const selectedObjects = [];
    for (const id in boardObjects.selected) {
      const boardObject = boardObjects.objects[id];
      if (boardObject.isEditing) {
        return;
      }
      selectedObjects.push(boardObject);
    }

    if (selectedObjects.length === 0) {
      return;
    }

    event.preventDefault();
    copyObjectToClipboard(selectedObjects);
  }

  function handleKeyboard(event) {
    if (event.key === "Escape") {
      handleEscape();
      return;
    }

    if (
      event.key === "Delete" ||
      (event.key === "Backspace" && event.metaKey)
    ) {
      const selectedObjectIds = Object.keys(boardObjectsRef.current.selected);
      if (selectedObjectIds.length === 0) {
        return;
      }
      const selectedObjects = selectedObjectIds.map((id) => ({
        ...boardObjectsRef.current.objects[id],
        isSelected: false,
        isEditing: false,
      }));
      dispatch(addHistoryItem({ type: "delete", data: selectedObjects }));
      dispatch(deleteSelected());

      return;
    }

    if (event.key === "v" && (event.ctrlKey || event.metaKey)) {
      handlePaste();
      return;
    }

    if (event.key === "z" && (event.ctrlKey || event.metaKey)) {
      historyRef.current.handleGoToPast();
      return;
    }

    if (event.key === "y" && (event.ctrlKey || event.metaKey)) {
      historyRef.current.handleGoToFuture();
      return;
    }

    if (event.key === "c" && (event.ctrlKey || event.metaKey)) {
      handleCopy(event);
      return;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => document.removeEventListener("keydown", handleKeyboard);
  }, []);
}
