import { toRealPoint } from "@/types/point";
import {
  clearSelection,
  selectObject,
  unselectObject,
} from "@/state/slices/boardObjectsSlice";
import {
  setIsDragging,
  setIsPanning,
  setPressed,
} from "@/state/slices/inputSlice";
import { RootState } from "@/state/store";
import BoardObject from "@/types/BoardObjects/boardObject";
import Input from "@/types/input";
import Toolbox from "@/types/toolbox";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBoardMouse from "./useBoardMouse";
import Camera from "@/types/camera";
import useUniversalInput from "./useUniversalInput";

export default function useBoardObjectMouse(boardObject: BoardObject) {
  const dispatch = useDispatch();
  const boardObjects = useSelector((state: RootState) => state.boardObjects);
  const input: Input = useSelector((state: RootState) => state.input);
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const toolbox: Toolbox = useSelector((state: RootState) => state.toolbox);
  const { selectedTool } = toolbox;
  const isPressed = useRef(false);

  const { handleStopDragging, stopPropagationAndEdit } = useUniversalInput();
  const { handleSelectedTool } = useBoardMouse();

  useEffect(() => {
    isPressed.current = input.pressed === boardObject.id;
  }, [input.pressed]);

  const handleMouseMove = (event) => {
    if (!isPressed.current) {
      return;
    }

    if (!boardObject.isSelected) {
      if (!event.shiftKey) {
        dispatch(clearSelection());
      }

      dispatch(selectObject(boardObject.id));
    }

    if (!input.isDragging) {
      dispatch(
        setIsDragging({
          isDragging: true,
          position: toRealPoint(input.mousePosition, camera),
        })
      );
    }
  };

  const handleMouseDown = (event) => {
    stopPropagationAndEdit(event);

    if (event.button === 1) {
      dispatch(setIsPanning(true));
      return;
    }

    if (event.button !== 0) {
      return;
    }

    if (selectedTool !== "cursor") {
      handleSelectedTool();
      return;
    }

    dispatch(setPressed(boardObject.id));
  };

  function toggleSelection() {
    if (boardObject.isSelected) {
      dispatch(unselectObject(boardObject.id));
    } else {
      dispatch(selectObject(boardObject.id));
    }
  }

  const handleMouseUp = (event) => {
    stopPropagationAndEdit(event);

    if (event.button === 1) {
      dispatch(setIsPanning(false));
      return;
    }

    if (event.button !== 0) {
      return;
    }

    if (boardObjects.resized !== null) {
      return;
    }

    if (boardObjects.rotated !== null) {
      return;
    }

    dispatch(setPressed(null));
    if (input.isDragging) {
      handleStopDragging();
      return;
    }

    if (!isPressed.current) {
      return;
    }

    if (!event.shiftKey) {
      dispatch(clearSelection());
      dispatch(selectObject(boardObject.id));
      return;
    }

    toggleSelection();
  };

  return {
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  };
}
