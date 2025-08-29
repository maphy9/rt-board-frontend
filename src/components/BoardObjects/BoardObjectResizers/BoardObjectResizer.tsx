import React from "react";
import { RootState } from "@/state/store";
import BoardObject, { ResizingCorner } from "@/types/boardObject";
import Camera, { scaleToCamera } from "@/types/camera";
import { toCameraPoint } from "@/types/point";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { toCameraSize } from "@/types/size";
import {
  OBJECT_RESIZER_BORDER_RADIUS,
  OBJECT_RESIZER_SIZE,
} from "@/constants/boardObjectConstants";
import {
  setResized,
  setResizingCorner,
} from "@/state/reducers/boardObjects/boardObjectsSlice";

function BoardObjectResizer({
  boardObject,
  resizingCorner,
}: {
  boardObject: BoardObject;
  resizingCorner: ResizingCorner;
}) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const dispatch = useDispatch();

  const objectPosition = toCameraPoint(boardObject.position, camera);
  const objectSize = toCameraSize(boardObject.size, camera);
  const resizerSize = scaleToCamera(OBJECT_RESIZER_SIZE, camera);
  const resizerBorderRadius = scaleToCamera(
    OBJECT_RESIZER_BORDER_RADIUS,
    camera
  );

  const handleMouseDown = (event) => {
    event.stopPropagation();

    dispatch(setResizingCorner({ id: boardObject.id, resizingCorner }));
    dispatch(setResized(boardObject.id));
  };

  let cursor = "not-allowed";
  if (resizingCorner === "top-left" || resizingCorner === "bottom-right") {
    cursor = "nw-resize";
  }
  if (resizingCorner === "top-right" || resizingCorner === "bottom-left") {
    cursor = "ne-resize";
  }

  let position = { x: -OBJECT_RESIZER_SIZE, y: -OBJECT_RESIZER_SIZE };
  if (resizingCorner === "top-left") {
    position.x = objectPosition.x - resizerSize / 2;
    position.y = objectPosition.y - resizerSize / 2;
  }
  if (resizingCorner === "top-right") {
    position.x = objectPosition.x + objectSize.width - resizerSize / 2;
    position.y = objectPosition.y - resizerSize / 2;
  }
  if (resizingCorner === "bottom-left") {
    position.x = objectPosition.x - resizerSize / 2;
    position.y = objectPosition.y + objectSize.height - resizerSize / 2;
  }
  if (resizingCorner === "bottom-right") {
    position.x = objectPosition.x + objectSize.width - resizerSize / 2;
    position.y = objectPosition.y + objectSize.height - resizerSize / 2;
  }

  return (
    <div
      onMouseDown={(event) => handleMouseDown(event)}
      className={styles.boardObjectResizer}
      style={{
        top: position.y,
        left: position.x,
        width: resizerSize,
        height: resizerSize,
        borderRadius: resizerBorderRadius,
        cursor,
      }}
    />
  );
}

export default BoardObjectResizer;
