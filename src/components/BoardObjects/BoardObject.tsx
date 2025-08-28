import { RootState } from "@/state/store";
import BoardObject from "@/types/boardObject";
import Camera, { scaleToCamera } from "@/types/camera";
import { toCameraPoint } from "@/types/point";
import React from "react";
import TextObject from "@/types/textObject";
import TextObjectComponent from "./TextObject/TextObject";
import styles from "./styles.module.css";
import useBoardObjectMouse from "@/hooks/useBoardObjectMouse";
import { useSelector } from "react-redux";
import { OBJECT_BORDER_RADIUS } from "@/constants/cameraConstants";

function BoardObjectComponent({ boardObject }: { boardObject: BoardObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);

  let child = <span>Something went wrong</span>;
  if (boardObject.type == "text") {
    child = <TextObjectComponent textObject={boardObject as TextObject} />;
  }

  const { handleMouseUp, handleMouseDown, handleMouseMove } =
    useBoardObjectMouse(boardObject);

  const position = toCameraPoint(boardObject.position, camera);
  const borderRadius = scaleToCamera(OBJECT_BORDER_RADIUS, camera);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={styles.boardObject}
      style={{
        top: position.y,
        left: position.x,
        outline: boardObject.isSelected ? "1px solid black" : "",
        borderRadius: `${borderRadius}px`,
      }}
    >
      {child}
    </div>
  );
}

export default BoardObjectComponent;
