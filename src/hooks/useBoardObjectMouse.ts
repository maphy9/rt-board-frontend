import {
  clearSelection,
  selectObject,
  setIsEditing,
  unselectObject,
} from "@/state/slices/boardObjectsSlice";
import { setIsDragging, setIsPanning } from "@/state/slices/inputSlice";
import { RootState } from "@/state/store";
import BoardObject from "@/types/boardObject";
import Input from "@/types/input";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useBoardObjectMouse(boardObject: BoardObject) {
  const dispatch = useDispatch();
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
    event.stopPropagation(); // Handle mouseDown event separately from the board

    if (event.button === 1) {
      // Start panning
      dispatch(setIsPanning(true));
      return;
    }

    if (event.button !== 0) {
      return;
    }

    isPressed.current = true;
  };

  const handleMouseUp = (event) => {
    event.stopPropagation(); // Handle mouseUp event separately from the board

    if (event.button === 1) {
      // Stop panning
      dispatch(setIsPanning(false));
      return;
    }

    if (event.button !== 0 || !isPressed.current) {
      return;
    }

    isPressed.current = false;
    if (input.isDragging) {
      // If dragging - don't handle selection
      dispatch(setIsDragging(false));
      return;
    }

    if (!event.shiftKey) {
      // Select only the pressed object
      const { id, isEditing } = boardObject;
      dispatch(clearSelection());
      dispatch(selectObject(boardObject.id));
      dispatch(setIsEditing({ id, isEditing }));
    } else {
      // Toggle selection
      if (boardObject.isSelected) {
        dispatch(unselectObject(boardObject.id));
      } else {
        dispatch(selectObject(boardObject.id));
      }
    }
  };

  return {
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  };
}
