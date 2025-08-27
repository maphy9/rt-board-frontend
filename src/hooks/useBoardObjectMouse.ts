import {
  clearSelection,
  selectObject,
} from "@/state/reducers/boardObjects/boardObjectsSlice";
import {
  setIsDragging,
  setIsHoldingMouse,
  setIsPanning,
} from "@/state/reducers/input/inputSlice";
import { RootState } from "@/state/store";
import BoardObject from "@/types/boardObject";
import Input from "@/types/input";
import { useDispatch, useSelector } from "react-redux";

export default function useBoardObjectMouse(boardObject: BoardObject) {
  const input: Input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

  const handleMouseUp = (event) => {
    event.stopPropagation();
    if (event.button === 1) {
      dispatch(setIsPanning(false));
    } else if (event.button === 0) {
      if (event.shiftKey) {
        dispatch(selectObject(boardObject.id));
      } else if (!input.isDragging) {
        dispatch(clearSelection());
        dispatch(selectObject(boardObject.id));
      }
      dispatch(setIsDragging(false));
      dispatch(setIsHoldingMouse(false));
    }
  };

  return {
    handleMouseUp,
  };
}
