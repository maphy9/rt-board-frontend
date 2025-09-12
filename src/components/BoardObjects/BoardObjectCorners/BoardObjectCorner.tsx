import React from "react";
import { RootState } from "@/state/store";
import BoardObject, { Corner } from "@/types/BoardObjects/boardObject";
import Camera, { scaleToCamera } from "@/types/camera";
import { toCameraPoint } from "@/types/point";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { toCameraSize } from "@/types/size";
import { OBJECT_RESIZER_SIZE } from "@/constants/boardObjectConstants";
import {
  setResized,
  setResizingCorner,
} from "@/state/slices/boardObjectsSlice";
import { getCornerPosition } from "@/utils/resizing";

function BoardObjectCorner({
  boardObject,
  corner,
}: {
  boardObject: BoardObject;
  corner: Corner;
}) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const dispatch = useDispatch();

  const objectPosition = toCameraPoint(boardObject.position, camera);
  const objectSize = toCameraSize(boardObject.size, camera);
  const resizerSize = Math.max(
    scaleToCamera(OBJECT_RESIZER_SIZE, camera),
    OBJECT_RESIZER_SIZE
  );

  const handleResizerMouseDown = (event) => {
    event.stopPropagation();

    dispatch(setResizingCorner({ id: boardObject.id, corner }));
    dispatch(setResized(boardObject.id));
  };

  const resizerCursor = getResizerCursor(corner);

  const resizerPosition = getCornerPosition(
    objectPosition,
    objectSize,
    resizerSize,
    corner
  );

  return (
    <div
      onMouseDown={handleResizerMouseDown}
      className={styles.boardObjectResizer}
      style={{
        top: resizerPosition.y,
        left: resizerPosition.x,
        width: resizerSize,
        height: resizerSize,
        borderRadius: resizerSize,
        cursor: resizerCursor,
      }}
    />
  );
}

export default BoardObjectCorner;

function getResizerCursor(corner: Corner) {
  switch (corner) {
    case "top-left":
      return "nw-resize";
    case "bottom-right":
      return "se-resize";
    case "top-right":
      return "ne-resize";
    case "bottom-left":
      return "sw-resize";
  }
}
