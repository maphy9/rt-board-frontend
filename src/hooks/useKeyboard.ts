import { toRealPoint } from "@/types/point";
import {
  addImageObject,
  clearSelection,
  deleteSelected,
} from "@/state/slices/boardObjectsSlice";
import { setSelectedTool } from "@/state/slices/toolboxSlice";
import { RootState } from "@/state/store";
import { getImageSize } from "@/utils/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function getType(types: readonly string[], type: string) {
  return types.find((t) => t.startsWith(type));
}

export default function useKeyboard() {
  const camera = useSelector((state: RootState) => state.camera);
  const input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

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
      const size = await getImageSize(src);
      dispatch(addImageObject({ src, position, size }));
    }
  }

  function handleKeyboard(event) {
    if (event.key === "Escape") {
      handleEscape();
      return;
    }

    if (event.key === "Delete") {
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
