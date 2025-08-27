import {
  clearSelection,
  moveSelectedObjects,
  selectObjectsInRectangle,
} from "@/state/reducers/boardObjects/boardObjectsSlice";
import { moveCamera } from "@/state/reducers/camera/cameraSlice";
import {
  setIsDragging,
  setIsHoldingMouse,
  setIsPanning,
  setIsSelecting,
  setMousePosition,
  setSelectionStart,
} from "@/state/reducers/input/inputSlice";
import { RootState } from "@/state/store";
import BoardObjects from "@/types/boardObjects";
import Camera from "@/types/camera";
import Input from "@/types/input";
import { toRealPoint } from "@/types/point";
import { createRectangle } from "@/types/rectangle";
import { useDispatch, useSelector } from "react-redux";

export default function useBoardMouse() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const input: Input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

  const handleMouseMove = (event) => {
    const { x: oldX, y: oldY } = input.mousePosition;
    const { clientX: x, clientY: y } = event;
    const dx = (oldX - x) * camera.zoom;
    const dy = (oldY - y) * camera.zoom;
    dispatch(setMousePosition({ x, y }));
    if (input.isPanning) {
      dispatch(moveCamera({ dx, dy }));
      return;
    }
    if (input.isHoldingMouse) {
      if (
        Object.keys(boardObjects.selected).length === 0 &&
        !input.isSelecting
      ) {
        dispatch(setIsSelecting(true));
        dispatch(setSelectionStart(toRealPoint({ x: oldX, y: oldY }, camera)));
      } else if (!input.isSelecting) {
        dispatch(setIsDragging(true));
        dispatch(moveSelectedObjects({ dx, dy }));
      }
    }
  };

  const handleMouseDown = (event) => {
    if (event.button === 1) {
      dispatch(setIsPanning(true));
    } else if (event.button === 0) {
      dispatch(setIsHoldingMouse(true));
    }
  };

  const handleMouseUp = (event) => {
    if (event.button === 1) {
      dispatch(setIsPanning(false));
      return;
    }
    if (event.button === 0) {
      if (input.isSelecting) {
        if (!event.shiftKey) {
          dispatch(clearSelection());
        }
        const realSelectionRectangle = createRectangle(
          input.selectionStart,
          toRealPoint(input.mousePosition, camera)
        );
        dispatch(selectObjectsInRectangle(realSelectionRectangle));
        dispatch(setIsSelecting(false));
      } else if (!input.isDragging) {
        dispatch(clearSelection());
      }
      dispatch(setIsDragging(false));
      dispatch(setIsHoldingMouse(false));
    }
  };

  return {
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  };
}
