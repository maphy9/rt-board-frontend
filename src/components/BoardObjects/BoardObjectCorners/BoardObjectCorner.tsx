import React from "react";
import { RootState } from "@/state/store";
import BoardObject, { Corner } from "@/types/BoardObjects/boardObject";
import Camera, { scaleToCamera, scaleToReal } from "@/types/camera";
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
import useUniversalInput from "@/hooks/useUniversalInput";
import { toCameraPoint } from "@/types/point";

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
  const { stopPropagationAndEdit } = useUniversalInput();

  const size = Math.max(
    scaleToCamera(OBJECT_RESIZER_SIZE, camera),
    OBJECT_RESIZER_SIZE
  );
  const resizerCursor = getResizerCursor(corner);

  const { realPosition, realOrigin } = getCornerPosition(
    boardObject,
    scaleToReal(size, camera),
    corner
  );
  const position = toCameraPoint(realPosition, camera);
  const origin = {
    x: scaleToCamera(realOrigin.x, camera),
    y: scaleToCamera(realOrigin.y, camera),
  };
  const handleMouseDown = (event) => {
    stopPropagationAndEdit(event);
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
        transform: `translate(${position.x}px, ${position.y}px) rotate(${boardObject.rotationAngle}deg)`,
        transformOrigin: `${origin.x}px ${origin.y}px`,
        willChange: "transform",
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
