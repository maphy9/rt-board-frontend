import { RootState } from "@/state/store";
import Camera, { scaleToCamera } from "@/types/camera";
import { toCameraPoint } from "@/types/point";
import React from "react";
import TextObjectComponent from "./TextObject/TextObject";
import styles from "./styles.module.css";
import useBoardObjectMouse from "@/hooks/useBoardObjectMouse";
import { useSelector } from "react-redux";
import BoardObjectCorners from "./BoardObjectCorners/BoardObjectCorners";
import { OBJECT_BORDER_RADIUS } from "@/constants/boardObjectConstants";
import TextObjectMenu from "./TextObject/TextObjectMenu";
import BoardObject from "@/types/BoardObjects/boardObject";
import TextObject from "@/types/BoardObjects/textObject";
import NoteObjectComponent from "./NoteObject/NoteObject";
import NoteObject from "@/types/BoardObjects/noteObject";
import NoteObjectMenu from "./NoteObject/NoteObjectMenu";
import ImageObjectComponent from "./ImageObject/ImageObject";
import ImageObject from "@/types/BoardObjects/imageObject";
import { toCameraSize } from "@/types/size";
import ImageObjectMenu from "./ImageObject/ImageObjectMenu";
import ShapeObjectComponent from "./ShapeObject/ShapeObject";
import ShapeObjectMenu from "./ShapeObject/ShapeObjectMenu";
import ShapeObject from "@/types/BoardObjects/shapeObject";
import BoardObjectRotate from "./BoardObjectRotate/BoardObjectRotate";
import { getCssColor } from "@/types/color";
import useUniversalInput from "@/hooks/useUniversalInput";

function BoardObjectComponent({ boardObject }: { boardObject: BoardObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const { theme } = useSelector((state: RootState) => state.theme);
  const { handleContextMenu, handleMouseUp, handleMouseDown, handleMouseMove } =
    useBoardObjectMouse(boardObject);

  const size = toCameraSize(boardObject.size, camera);
  const position = toCameraPoint(boardObject.position, camera);
  const borderRadius = scaleToCamera(OBJECT_BORDER_RADIUS, camera);
  const { objectComponent, objectMenuComponent } = getObjectData(boardObject);

  return (
    <div className={styles.boardObjectContainer}>
      <div
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
        className={styles.boardObject}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotate(${
            boardObject.rotationAngle
          }deg) scaleX(${boardObject.isFlippedHorizontally ? -1 : 1}) scaleY(${
            boardObject.isFlippedVertically ? -1 : 1
          })`,
          willChange: "transform",
          outline: boardObject.isSelected
            ? `1px solid ${getCssColor(theme.secondary)}`
            : "",
          transformOrigin: "50% 50%",
          borderRadius: `${borderRadius}px`,
          width: size.width,
          height: size.height,
        }}
      >
        {objectComponent}
      </div>

      <BoardObjectCorners boardObject={boardObject} />

      <BoardObjectRotate boardObject={boardObject} />

      {objectMenuComponent}
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
  } else if (boardObject.type == "note") {
    objectComponent = (
      <NoteObjectComponent noteObject={boardObject as NoteObject} />
    );
    objectMenuComponent = (
      <NoteObjectMenu noteObject={boardObject as NoteObject} />
    );
  } else if (boardObject.type == "image") {
    objectComponent = (
      <ImageObjectComponent imageObject={boardObject as ImageObject} />
    );
    objectMenuComponent = (
      <ImageObjectMenu imageObject={boardObject as ImageObject} />
    );
  } else if (boardObject.type === "shape") {
    objectComponent = (
      <ShapeObjectComponent shapeObject={boardObject as ShapeObject} />
    );
    objectMenuComponent = (
      <ShapeObjectMenu shapeObject={boardObject as ShapeObject} />
    );
  }

  return { objectComponent, objectMenuComponent };
};
