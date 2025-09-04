import React from "react";
import { toCameraPoint } from "@/types/point";
import Camera from "@/types/camera";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  OBJECT_MENU_MARGIN,
  OBJECT_MENU_OPTION_SIZE,
} from "@/constants/boardObjectConstants";
import BoardObject from "@/types/boardObject";
import useGlobalHooks from "@/hooks/globalHooks";
import styles from "./styles.module.css";
import BoardObjects from "@/types/boardObjects";
import Input from "@/types/input";

function BoardObjectMenu({
  boardObject,
  children,
}: {
  boardObject: BoardObject;
  children: React.ReactNode;
}) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const input: Input = useSelector((state: RootState) => state.input);

  const camera: Camera = useSelector((state: RootState) => state.camera);
  const position = toCameraPoint(
    {
      x: boardObject.position.x,
      y: boardObject.position.y,
    },
    camera
  );
  position.y -= OBJECT_MENU_OPTION_SIZE + OBJECT_MENU_MARGIN;

  const { stopPropagation } = useGlobalHooks();

  const showMenu =
    boardObject.isSelected &&
    Object.keys(boardObjects.selected).length === 1 &&
    !input.isDragging;

  if (!showMenu) {
    return <></>;
  }

  return (
    <div
      className={styles.boardObjectMenu}
      onMouseDown={stopPropagation}
      onMouseUp={stopPropagation}
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      {children}
    </div>
  );
}

export default BoardObjectMenu;
