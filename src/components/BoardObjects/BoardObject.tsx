import { RootState } from "@/state/store";
import Camera, { scaleToCamera } from "@/types/camera";
import { toCameraPoint } from "@/types/point";
import React from "react";
import TextObjectComponent from "./TextObject/TextObject";
import styles from "./styles.module.css";
import useBoardObjectMouse from "@/hooks/useBoardObjectMouse";
import { useSelector } from "react-redux";
import BoardObjectResizers from "./BoardObjectResizers/BoardObjectResizers";
import { OBJECT_BORDER_RADIUS } from "@/constants/boardObjectConstants";
import TextObjectMenu from "./TextObject/TextObjectMenu";
import BoardObject from "@/types/BoardObjects/boardObject";
import TextObject from "@/types/BoardObjects/textObject";

function BoardObjectComponent({ boardObject }: { boardObject: BoardObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);

  const { handleMouseUp, handleMouseDown, handleMouseMove } =
    useBoardObjectMouse(boardObject);

  const position = toCameraPoint(boardObject.position, camera);
  const borderRadius = scaleToCamera(OBJECT_BORDER_RADIUS, camera);
  const { objectComponent, objectMenuComponent } = getObjectData(boardObject);

  return (
    <div className={styles.boardObjectContainer}>
      {objectMenuComponent}
      {<BoardObjectResizers boardObject={boardObject} />}
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
        {objectComponent}
      </div>
    </div>
  );
}

export default BoardObjectComponent;

const getObjectData = (boardObject: BoardObject) => {
  let objectComponent = <></>;
  let objectMenuComponent = <></>;
  if (boardObject.type == "text") {
    objectComponent = (
      <TextObjectComponent textObject={boardObject as TextObject} />
    );
    objectMenuComponent = (
      <TextObjectMenu textObject={boardObject as TextObject} />
    );
  }

  return { objectComponent, objectMenuComponent };
};
