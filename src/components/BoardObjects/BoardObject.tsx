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
import BoardObjects from "@/types/boardObjects";
import Input from "@/types/input";
import BoardObjectResizers from "./BoardObjectResizers/BoardObjectResizers";
import { OBJECT_BORDER_RADIUS } from "@/constants/boardObjectConstants";
import TextObjectMenu from "./TextObject/TextObjectMenu";

function BoardObjectComponent({ boardObject }: { boardObject: BoardObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const input: Input = useSelector((state: RootState) => state.input);

  const canResize =
    boardObject.isSelected &&
    !boardObject.isEditing &&
    Object.keys(boardObjects.selected).length === 1 &&
    !input.isDragging;

  const showMenu =
    boardObject.isSelected &&
    Object.keys(boardObjects.selected).length === 1 &&
    !input.isDragging;

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

  const { handleMouseUp, handleMouseDown, handleMouseMove } =
    useBoardObjectMouse(boardObject);

  const position = toCameraPoint(boardObject.position, camera);
  const borderRadius = scaleToCamera(OBJECT_BORDER_RADIUS, camera);

  return (
    <div className={styles.boardObjectContainer}>
      {showMenu ? objectMenuComponent : <></>}
      {canResize ? <BoardObjectResizers boardObject={boardObject} /> : <></>}
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
