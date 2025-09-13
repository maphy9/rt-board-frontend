import { toRealPoint } from "@/types/point";
import {
  addObject,
  clearSelection,
  deleteSelected,
  selectObject,
} from "@/state/slices/boardObjectsSlice";
import { setSelectedTool } from "@/state/slices/toolboxSlice";
import { RootState } from "@/state/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoardObject } from "@/types/BoardObjects/boardObject";
import useTheme from "./useTheme";

function getType(types: readonly string[], type: string) {
  return types.find((t) => t.startsWith(type));
}

export default function useKeyboard() {
  const camera = useSelector((state: RootState) => state.camera);
  const input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

  const { theme } = useTheme();

  function handleEscape() {
    dispatch(clearSelection());
    dispatch(setSelectedTool("cursor"));
  }

  async function handlePaste() {
    const clipboardItems = await navigator.clipboard.read();
    if (clipboardItems.length === 0) {
      return;
    }

    const clipboardItem = clipboardItems[0];

    if (getType(clipboardItem.types, "text/plain")) {
      return;
    }

    const imageType = getType(clipboardItem.types, "image");
    if (imageType !== undefined) {
      const blob = await clipboardItem.getType(imageType);
      const src = URL.createObjectURL(blob);
      const position = toRealPoint(input.mousePosition, camera);
      const imageObject = await createBoardObject(
        "image",
        position,
        theme,
        src
      );
      dispatch(addObject(imageObject));
    }
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
      dispatch(deleteSelected());
      return;
    }

    if (event.key === "v" && (event.ctrlKey || event.metaKey)) {
      handlePaste();
      return;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => document.removeEventListener("keydown", handleKeyboard);
  });
}
