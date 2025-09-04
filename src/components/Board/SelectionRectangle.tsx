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
import { toRealPoint } from "@/types/point";
import Camera from "@/types/camera";

function SelectionRectangle() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const input: Input = useSelector((state: RootState) => state.input);

  const realSelectionRectangle = createRectangle(
    input.selectionStart,
    toRealPoint(input.mousePosition, camera)
  );
  const selectionRectangle = toCameraRectangle(realSelectionRectangle, camera);
  const selectionSize = getRectangleSize(selectionRectangle);

  return input.isSelecting ? (
    <div
      className={styles.selectionRectangle}
      style={{
        top: selectionRectangle.start.y,
        left: selectionRectangle.start.x,
        width: selectionSize.width,
        height: selectionSize.height,
      }}
    />
  ) : (
    <></>
  );
}

export default SelectionRectangle;
