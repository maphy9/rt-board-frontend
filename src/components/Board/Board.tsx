import React, { useRef } from "react";
import { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  moveCamera,
  zoomCamera,
} from "../../state/reducers/camera/cameraSlice";
import Camera from "../../types/camera";
import styles from "./styles.module.css";
import { MAX_ZOOM, MIN_ZOOM } from "../../constants/cameraConstants";
import BoardObjects from "@/types/BoardObjects";
import { addTextObject } from "@/state/reducers/boardObjects/boardObjectsSlice";
import { getOffset, toCameraPoint, toRealPoint } from "@/types/point";
import { toCameraSize } from "@/types/size";

function Board() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const dispatch = useDispatch();

  const mousePosition = useRef({ x: 0, y: 0 });
  const isDraging = useRef(false);

  const handleMouseMove = (event) => {
    const { clientX: x, clientY: y } = event;
    if (!isDraging.current) {
      mousePosition.current = { x, y };
      return;
    }
    const dx = (mousePosition.current.x - x) * camera.zoom;
    const dy = (mousePosition.current.y - y) * camera.zoom;
    mousePosition.current = { x, y };
    dispatch(moveCamera({ dx, dy }));
  };

  const handleWheel = (event) => {
    const mouse = mousePosition.current;
    const { deltaY } = event;
    const zoomFactor = deltaY > 0 ? 1.05 : 0.95;
    const newZoom = Math.min(
      MAX_ZOOM,
      Math.max(camera.zoom * zoomFactor, MIN_ZOOM)
    );
    const newCamera = { ...camera, zoom: newZoom };
    const mouseBefore = toRealPoint(mouse, camera);
    const mouseAfter = toRealPoint(mouse, newCamera);
    const { x: dx, y: dy } = getOffset(mouseBefore, mouseAfter);
    dispatch(zoomCamera({ zoom: newZoom, dx, dy }));
  };

  const handleMouseDown = (event) => {
    if (event.button == 1) {
      // Only pan on mouse wheel
      isDraging.current = true;
      return;
    }
  };

  const handleMouseUp = (event) => {
    if (event.button == 1) {
      // Only pan on mouse wheel
      isDraging.current = false;
      return;
    }
  };

  return (
    <div
      className={styles.board}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <button
        onClick={() => {
          dispatch(
            addTextObject({ position: { x: 200, y: 300 }, text: "Hello world" })
          );
        }}
      >
        Add text object
      </button>
      {...boardObjects.order.map((id: number) => {
        console.log(id);
        const object = boardObjects.objects[id];
        const position = toCameraPoint(object.position, camera);
        const size = toCameraSize(object.size, camera);
        const fontSize = object.fontSize / camera.zoom;
        return (
          <span
            style={{
              position: "absolute",
              top: position.y,
              left: position.x,
              width: size.width,
              height: size.height,
              color: object.color,
              fontStyle: object.fontStyle,
              fontSize,
            }}
          >
            {object.text}
          </span>
        );
      })}
    </div>
  );
}

export default Board;
