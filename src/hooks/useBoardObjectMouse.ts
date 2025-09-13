import {
  clearSelection,
  selectObject,
  setIsEditing,
  setResized,
  setRotatingPoint,
  unselectObject,
} from "@/state/slices/boardObjectsSlice";
import { setIsDragging, setIsPanning } from "@/state/slices/inputSlice";
import { RootState } from "@/state/store";
import BoardObject from "@/types/BoardObjects/boardObject";
import Input from "@/types/input";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useBoardObjectMouse(boardObject: BoardObject) {
  const dispatch = useDispatch();
  const boardObjects = useSelector((state: RootState) => state.boardObjects);
  const input: Input = useSelector((state: RootState) => state.input);
  const isPressed = useRef(false);

  const handleMouseMove = (event) => {
    if (isPressed.current) {
      if (!boardObject.isSelected) {
        if (!event.shiftKey) {
          dispatch(clearSelection());
        }

        dispatch(selectObject(boardObject.id));
      }
      dispatch(setIsDragging(true));
    }
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

    isPressed.current = true;
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

    if (boardObject.resizingCorner !== null) {
      dispatch(setResized(null));
      return;
    }

    if (boardObjects.rotated !== null) {
      dispatch(
        setRotatingPoint({ id: boardObjects.rotated, rotatingPoint: null })
      );
      return;
    }

    if (!isPressed.current) {
      return;
    }

    isPressed.current = false;
    if (input.isDragging) {
      dispatch(setIsDragging(false));
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
