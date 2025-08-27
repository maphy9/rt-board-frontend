import {
  clearSelection,
  moveSelectedObjects,
  selectObjectsInRectangle,
} from "@/state/reducers/boardObjects/boardObjectsSlice";
import { panCamera } from "@/state/reducers/camera/cameraSlice";
import {
  setIsDragging,
  setIsHoldingMouse,
  setIsPanning,
  setIsSelecting,
  setMousePosition,
  setSelectionStart,
} from "@/state/reducers/input/inputSlice";
import { RootState } from "@/state/store";
import Camera from "@/types/camera";
import Input from "@/types/input";
import { toRealPoint } from "@/types/point";
import { createRectangle } from "@/types/rectangle";
import { useDispatch, useSelector } from "react-redux";

export default function useBoardMouse() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const input: Input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

  function finishSelection(event) {
    if (!event.shiftKey) {
      dispatch(clearSelection());
    }

    const realSelectionRectangle = createRectangle(
      input.selectionStart,
      toRealPoint(input.mousePosition, camera)
    );
    dispatch(selectObjectsInRectangle(realSelectionRectangle));
    dispatch(setIsSelecting(false));
  }

  const handleMouseMove = (event) => {
    // Get the mouse position delta and update the current mouse position
    const { x: oldX, y: oldY } = input.mousePosition;
    const { clientX: newX, clientY: newY } = event;
    const dx = (oldX - newX) * camera.zoom;
    const dy = (oldY - newY) * camera.zoom;
    dispatch(setMousePosition({ x: newX, y: newY }));

    if (input.isPanning) {
      dispatch(panCamera({ dx, dy }));
      return;
    }

    if (input.isDragging) {
      // Drag selected objects
      dispatch(moveSelectedObjects({ dx, dy }));
      return;
    }
  };

  const handleMouseDown = (event) => {
    if (event.button === 1) {
      // Start panning
      dispatch(setIsPanning(true));
      return;
    }

    if (event.button === 0) {
      // The user is holding mouse
      dispatch(setIsSelecting(true));
      const { clientX: x, clientY: y } = event;
      const realMousePosition = toRealPoint({ x, y }, camera);
      dispatch(setSelectionStart(realMousePosition));
    }
  };

  const handleMouseUp = (event) => {
    if (event.button === 1) {
      // Stop panning
      dispatch(setIsPanning(false));
      return;
    }

    if (event.button !== 0) {
      return;
    }

    dispatch(setIsHoldingMouse(false));

    if (input.isSelecting) {
      finishSelection(event);
      return;
    }

    if (!input.isDragging) {
      dispatch(clearSelection());
      return;
    }

    dispatch(setIsDragging(false));
  };

  return {
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  };
}
