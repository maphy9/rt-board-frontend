import { RootState } from "@/state/store";
import Input from "@/types/input";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import {
  createRectangle,
  getRectangleSize,
  toCameraRectangle,
} from "@/types/rectangle";
import { toCameraPoint, toRealPoint } from "@/types/point";
import Camera from "@/types/camera";

function SelectionRectangle() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const input: Input = useSelector((state: RootState) => state.input);

  const realSelectionRectangle = createRectangle(
    input.selectionStart,
    toRealPoint(input.mousePosition, camera)
  );
  const selectionRectangle = toCameraRectangle(realSelectionRectangle, camera);
  const size = getRectangleSize(selectionRectangle);
  const position = toCameraPoint(realSelectionRectangle.start, camera);

  return input.isSelecting ? (
    <div
      className={styles.selectionRectangle}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        willChange: "transform",
        width: size.width,
        height: size.height,
      }}
    />
  ) : (
    <></>
  );
}

export default SelectionRectangle;
