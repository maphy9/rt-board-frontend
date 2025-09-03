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

function BoardObjectMenu({
  boardObject,
  children,
}: {
  boardObject: BoardObject;
  children: React.ReactNode;
}) {
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
