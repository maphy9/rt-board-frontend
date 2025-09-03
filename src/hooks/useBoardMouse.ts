import { MAX_ZOOM, MIN_ZOOM } from "@/constants/cameraConstants";
import {
  clearSelection,
  moveSelectedObjects,
  resize,
  selectObjectsInRectangle,
  setResized,
} from "@/state/slices/boardObjectsSlice";
import { panCamera, zoomCamera } from "@/state/slices/cameraSlice";
import {
  setIsDragging,
  setIsPanning,
  setIsSelecting,
  setMousePosition,
  setSelectionStart,
} from "@/state/slices/inputSlice";
import { RootState } from "@/state/store";
import BoardObjects from "@/types/boardObjects";
import Camera from "@/types/camera";
import Input from "@/types/input";
import { getOffset, toRealPoint } from "@/types/point";
import { createRectangle } from "@/types/rectangle";
import { useDispatch, useSelector } from "react-redux";

export default function useBoardMouse() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const input: Input = useSelector((state: RootState) => state.input);
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
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

    if (boardObjects.resized !== null) {
      dispatch(resize({ dx, dy }));
      return;
    }

    if (input.isDragging) {
      dispatch(moveSelectedObjects({ dx, dy }));
      return;
    }
  };

  const handleMouseDown = (event) => {
    if (event.button === 1) {
      dispatch(setIsPanning(true));
      return;
    }

    if (event.button === 0) {
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

    if (input.isSelecting) {
      finishSelection(event);
      return;
    }

    if (boardObjects.resized !== null) {
      dispatch(setResized(null));
      return;
    }

    if (!input.isDragging) {
      dispatch(clearSelection());
      return;
    }

    dispatch(setIsDragging(false));
  };

  function scaleZoom(zoom: number, zoomFactor: number): number {
    return Math.min(MAX_ZOOM, Math.max(zoom * zoomFactor, MIN_ZOOM));
  }

  const handleWheel = (event) => {
    const { deltaY } = event;
    const zoomFactor = deltaY > 0 ? 1.05 : 0.95;
    const newZoom = scaleZoom(camera.zoom, zoomFactor);
    const newCamera = { ...camera, zoom: newZoom };
    const mouseBefore = toRealPoint(input.mousePosition, camera);
    const mouseAfter = toRealPoint(input.mousePosition, newCamera);
    const { x: dx, y: dy } = getOffset(mouseBefore, mouseAfter);
    dispatch(zoomCamera({ zoom: newZoom, dx, dy }));
  };

  return {
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleWheel,
  };
}
