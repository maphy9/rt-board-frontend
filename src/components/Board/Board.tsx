import React, { useRef } from "react";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { moveCamera, zoomCamera } from "@/state/reducers/camera/cameraSlice";
import Camera from "@/types/camera";
import styles from "./styles.module.css";
import { MAX_ZOOM, MIN_ZOOM } from "@/constants/cameraConstants";
import BoardObjects from "@/types/boardObjects";
import {
  addTextObject,
  clearSelection,
  moveSelectedObjects,
  selectObjectsInRectangle,
} from "@/state/reducers/boardObjects/boardObjectsSlice";
import { getOffset, toCameraPoint, toRealPoint } from "@/types/point";
import BoardObjectComponent from "@/components/BoardObjects/BoardObject";
import Input from "@/types/input";
import {
  setIsDragging,
  setIsHoldingMouse,
  setIsPanning,
  setIsSelecting,
  setMousePosition,
  setSelectionStart,
} from "@/state/reducers/input/inputSlice";
import {
  createRectangle,
  getRectangleSize,
  toCameraRectangle,
} from "@/types/rectangle";

function Board() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const input: Input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

  const handleMouseMove = (event) => {
    event.preventDefault();
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

  const handleWheel = (event) => {
    const { deltaY } = event;
    const zoomFactor = deltaY > 0 ? 1.05 : 0.95;
    const newZoom = Math.min(
      MAX_ZOOM,
      Math.max(camera.zoom * zoomFactor, MIN_ZOOM)
    );
    const newCamera = { ...camera, zoom: newZoom };
    const mouseBefore = toRealPoint(input.mousePosition, camera);
    const mouseAfter = toRealPoint(input.mousePosition, newCamera);
    const { x: dx, y: dy } = getOffset(mouseBefore, mouseAfter);
    dispatch(zoomCamera({ zoom: newZoom, dx, dy }));
  };

  const handleMouseDown = (event) => {
    if (event.button === 1) {
      dispatch(setIsPanning(true));
    } else if (event.button === 0) {
      dispatch(setIsHoldingMouse(true));
    }
  };

  const realSelectionRectangle = createRectangle(
    input.selectionStart,
    toRealPoint(input.mousePosition, camera)
  );

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
        dispatch(selectObjectsInRectangle(realSelectionRectangle));
        dispatch(setIsSelecting(false));
      } else if (!input.isDragging) {
        dispatch(clearSelection());
      }
      dispatch(setIsDragging(false));
      dispatch(setIsHoldingMouse(false));
    }
  };

  const selectionRectangle = toCameraRectangle(realSelectionRectangle, camera);
  const selectionSize = getRectangleSize(selectionRectangle);

  return (
    <div
      className={styles.board}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <button
        onClick={(event) => {
          event.stopPropagation();
          const x = Math.floor(Math.random() * (window.innerWidth + 1));
          const y = Math.floor(Math.random() * (window.innerHeight + 1));
          dispatch(addTextObject({ position: { x, y }, text: "Hello world" }));
        }}
      >
        Add text object
      </button>
      {...boardObjects.order.map((id: number) => {
        const boardObject = boardObjects.objects[id];
        return <BoardObjectComponent boardObject={boardObject} />;
      })}

      {input.isSelecting ? (
        <div
          style={{
            position: "absolute",
            top: selectionRectangle.start.y,
            left: selectionRectangle.start.x,
            width: selectionSize.width,
            height: selectionSize.height,
            border: "1px solid black",
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Board;
