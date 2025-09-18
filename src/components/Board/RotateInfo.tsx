import { RootState } from "@/state/store";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import BoardObject, { Corner } from "@/types/BoardObjects/boardObject";
import { getCssColor } from "@/types/color";

function RotateInfo() {
  const boardObjects = useSelector((state: RootState) => state.boardObjects);
  const input = useSelector((state: RootState) => state.input);
  const { theme } = useSelector((state: RootState) => state.theme);

  const isVisible = boardObjects.rotated !== null;
  const boardObject: BoardObject | null = isVisible
    ? boardObjects.objects[boardObjects.rotated.id]
    : null;

  const position = {
    x: input.mousePosition.x + 20,
    y: input.mousePosition.y + 20,
  };

  return isVisible ? (
    <div
      className={styles.extraInfo}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        willChange: "transform",
        color: getCssColor(theme.secondary),
      }}
    >
      <span>{boardObject.rotationAngle.toFixed(2)}°</span>
    </div>
  ) : (
    <></>
  );
}

export default RotateInfo;
