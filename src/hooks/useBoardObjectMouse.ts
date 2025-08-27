import {
  clearSelection,
  selectObject,
} from "@/state/reducers/boardObjects/boardObjectsSlice";
import { setIsDragging, setIsPanning } from "@/state/reducers/input/inputSlice";
import { RootState } from "@/state/store";
import BoardObject from "@/types/boardObject";
import Input from "@/types/input";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useBoardObjectMouse(boardObject: BoardObject) {
  const dispatch = useDispatch();
  const input: Input = useSelector((state: RootState) => state.input);
  const hasMoved = useRef(false);

  const handleMouseMove = () => {
    if (input.isDragging) {
      hasMoved.current = true;
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

    dispatch(selectObject(boardObject.id));

    // The user is dragging selected objects
    dispatch(setIsDragging(true));
  };

  const handleMouseUp = (event) => {
    event.stopPropagation(); // Handle mouseUp event separately from the board

    if (event.button === 1) {
      // Stop panning
      dispatch(setIsPanning(false));
      return;
    }

    if (event.button !== 0) {
      return;
    }

    if (!event.shiftKey && !hasMoved.current) {
      dispatch(clearSelection());
    }

    dispatch(selectObject(boardObject.id));

    dispatch(setIsDragging(false));
    hasMoved.current = false;
  };

  return {
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  };
}
