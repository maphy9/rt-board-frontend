import React from "react";
import { RootState } from "@/state/store";
import BoardObject, { Corner } from "@/types/BoardObjects/boardObject";
import Camera, { scaleToCamera } from "@/types/camera";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { toCameraSize } from "@/types/size";
import { OBJECT_RESIZER_SIZE } from "@/constants/boardObjectConstants";
import {
  setResized,
  setResizingCorner,
} from "@/state/slices/boardObjectsSlice";
import { getCornerPosition } from "@/utils/resizing";
import { getCssColor } from "@/types/color";

function BoardObjectCorner({
  boardObject,
  corner,
}: {
  boardObject: BoardObject;
  corner: Corner;
}) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const dispatch = useDispatch();

  const { theme } = useSelector((state: RootState) => state.theme);

  const objectSize = toCameraSize(boardObject.size, camera);
  const size = Math.max(
    scaleToCamera(OBJECT_RESIZER_SIZE, camera),
    OBJECT_RESIZER_SIZE
  );
  const resizerCursor = getResizerCursor(corner);
  const position = getCornerPosition(objectSize, size, corner);

  const handleMouseDown = (event) => {
    event.stopPropagation();

    dispatch(setResizingCorner({ id: boardObject.id, corner }));
    dispatch(setResized(boardObject.id));
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className={styles.boardObjectResizer}
      style={{
        border: `1px solid ${getCssColor(theme.secondary)}`,
        backgroundColor: getCssColor(theme.primary),
        top: position.y,
        left: position.x,
        width: size,
        height: size,
        borderRadius: size,
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
