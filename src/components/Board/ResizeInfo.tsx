import { RootState } from "@/state/store";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import BoardObject, { Corner } from "@/types/BoardObjects/boardObject";
import Point, { addOffset } from "@/types/point";
import { getCssColor } from "@/types/color";
import Theme from "@/types/theme";

function ResizeInfo() {
  const boardObjects = useSelector((state: RootState) => state.boardObjects);
  const input = useSelector((state: RootState) => state.input);

  const theme: Theme = useSelector((state: RootState) => state.theme);

  const isVisible = boardObjects.resized !== null;
  const boardObject: BoardObject | null = isVisible
    ? boardObjects.objects[boardObjects.resized]
    : null;

  const position = getPosition(
    input.mousePosition,
    boardObject?.resizingCorner
  );

  return isVisible ? (
    <div
      className={styles.extraInfo}
      style={{
        left: position.x,
        top: position.y,
        color: getCssColor(theme.secondary),
      }}
    >
      <span>Width: {boardObject.size.width.toFixed(2)}</span>
      <span>Height: {boardObject.size.height.toFixed(2)}</span>
    </div>
  ) : (
    <></>
  );
}

export default ResizeInfo;

function getPosition(mousePosition, resizingCorner?: Corner): Point {
  if (resizingCorner === undefined) {
    return mousePosition;
  }

  let x = 0;
  let y = 0;
  switch (resizingCorner) {
    case "top-right":
      x = 20;
      y = -60;
      break;
    case "top-left":
      x = -100;
      y = -60;
      break;
    case "bottom-left":
      x = -100;
      y = 20;
      break;
    case "bottom-right":
      x = 20;
      y = 20;
      break;
  }

  return addOffset(mousePosition, { x, y });
}
