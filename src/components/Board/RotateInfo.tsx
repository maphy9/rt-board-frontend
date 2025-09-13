import { RootState } from "@/state/store";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import BoardObject, { Corner } from "@/types/BoardObjects/boardObject";

function RotateInfo() {
  const boardObjects = useSelector((state: RootState) => state.boardObjects);
  const input = useSelector((state: RootState) => state.input);

  const isVisible = boardObjects.rotated !== null;
  const boardObject: BoardObject | null = isVisible
    ? boardObjects.objects[boardObjects.rotated]
    : null;

  return isVisible ? (
    <div
      className={styles.extraInfo}
      style={{
        left: input.mousePosition.x + 20,
        top: input.mousePosition.y + 20,
      }}
    >
      <span>{boardObject.rotationAngle.toFixed(2)}°</span>
    </div>
  ) : (
    <></>
  );
}

export default RotateInfo;
