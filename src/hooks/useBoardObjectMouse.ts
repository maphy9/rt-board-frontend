import {
  clearSelection,
  selectObject,
  setIsEditing,
  setResized,
  setRotatingPoint,
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
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useBoardObjectMouse(boardObject: BoardObject) {
  const dispatch = useDispatch();
  const boardObjects = useSelector((state: RootState) => state.boardObjects);
  const input: Input = useSelector((state: RootState) => state.input);
  const isPressed = useRef(false);

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

    dispatch(setIsDragging(true));
  };

  const handleMouseDown = (event) => {
    event.stopPropagation();

    if (event.button === 1) {
      dispatch(setIsPanning(true));
      return;
    }

    if (event.button !== 0) {
      return;
    }

    dispatch(setPressed(boardObject.id));
  };

  function selectOnlyOne() {
    const { id, isEditing } = boardObject;
    dispatch(clearSelection());
    dispatch(selectObject(boardObject.id));
    dispatch(setIsEditing({ id, isEditing }));
  }

  function toggleSelection() {
    if (boardObject.isSelected) {
      dispatch(unselectObject(boardObject.id));
    } else {
      dispatch(selectObject(boardObject.id));
    }
  }

  const handleMouseUp = (event) => {
    event.stopPropagation();

    if (event.button === 1) {
      dispatch(setIsPanning(false));
      return;
    }

    if (event.button !== 0) {
      return;
    }

    if (boardObjects.resized !== null) {
      dispatch(setResized(null));
      return;
    }

    if (boardObjects.rotated !== null) {
      dispatch(
        setRotatingPoint({ id: boardObjects.rotated, rotatingPoint: null })
      );
      return;
    }

    dispatch(setPressed(null));
    if (input.isDragging) {
      dispatch(setIsDragging(false));
      return;
    }

    if (!isPressed.current) {
      return;
    }

    if (!event.shiftKey) {
      selectOnlyOne();
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
