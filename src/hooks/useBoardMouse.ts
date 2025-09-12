import { MAX_ZOOM, MIN_ZOOM } from "@/constants/cameraConstants";
import {
  addImageObject,
  addObject,
  clearSelection,
  dragSelected,
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
import { setSelectedTool } from "@/state/slices/toolboxSlice";
import { RootState } from "@/state/store";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import { isShape } from "@/types/BoardObjects/shapeObject";
import Camera from "@/types/camera";
import Input from "@/types/input";
import { getOffset, toRealPoint } from "@/types/point";
import { createRectangle } from "@/types/rectangle";
import { scaleSize } from "@/types/size";
import Toolbox from "@/types/toolbox";
import { getImageSize } from "@/utils/image";
import { useDispatch, useSelector } from "react-redux";

export default function useBoardMouse() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const input: Input = useSelector((state: RootState) => state.input);
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const toolbox: Toolbox = useSelector((state: RootState) => state.toolbox);
  const { selectedTool } = toolbox;
  const dispatch = useDispatch();

  function addSelectedObject() {
    const position = toRealPoint(input.mousePosition, camera);
    dispatch(addObject({ selectedTool, position }));
    dispatch(setSelectedTool("cursor"));
  }

  function startSelecting(event) {
    dispatch(setIsSelecting(true));
    const { clientX: x, clientY: y } = event;
    const realMousePosition = toRealPoint({ x, y }, camera);
    dispatch(setSelectionStart(realMousePosition));
  }

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

  function getMouseData(event) {
    const { x: oldX, y: oldY } = input.mousePosition;
    const { clientX: newX, clientY: newY } = event;
    const dx = (oldX - newX) * camera.zoom;
    const dy = (oldY - newY) * camera.zoom;

    return { newX, newY, dx, dy };
  }

  const handleMouseMove = (event) => {
    const { newX, newY, dx, dy } = getMouseData(event);
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
      dispatch(dragSelected({ dx, dy }));
      return;
    }
  };

  const handleSelectedTool = async (event) => {
    if (selectedTool === "cursor") {
      startSelecting(event);
      return;
    }

    if (selectedTool === "image") {
      document.getElementById("image-uploader").click();
    } else if (isShape(selectedTool)) {
      const src = `${selectedTool}.svg`;
      const position = toRealPoint(input.mousePosition, camera);
      const size = scaleSize(await getImageSize(src), 4);
      dispatch(addImageObject({ src, position, size }));
      addImageObject({ src, position, size });
    } else {
      addSelectedObject();
    }

    dispatch(setSelectedTool("cursor"));
  };

  const handleMouseDown = (event) => {
    if (event.button === 1) {
      dispatch(setIsPanning(true));
      return;
    }

    if (event.button === 0) {
      handleSelectedTool(event);
    }
  };

  const handleMouseUp = (event) => {
    if (event.button === 1) {
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
