import { RootState } from "@/state/store";
import BoardObject from "@/types/BoardObject";
import Camera from "@/types/camera";
import { toCameraPoint } from "@/types/point";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TextObject from "@/types/TextObject";
import TextObjectComponent from "./TextObject";
import {
  clearSelection,
  selectObject,
} from "@/state/reducers/boardObjects/boardObjectsSlice";
import styles from "./styles.module.css";
import {
  setIsDragging,
  setIsHoldingMouse,
  setIsPanning,
} from "@/state/reducers/input/inputSlice";
import Input from "@/types/Input";

function BoardObjectComponent({ boardObject }: { boardObject: BoardObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const input: Input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

  let child = <span>Something went wrong</span>;
  if (boardObject.type == "text") {
    child = <TextObjectComponent textObject={boardObject as TextObject} />;
  }

  const handleMouseUp = (event) => {
    event.stopPropagation();
    if (event.button === 1) {
      dispatch(setIsPanning(false));
    } else if (event.button === 0) {
      if (event.shiftKey) {
        dispatch(selectObject(boardObject.id));
      } else if (!input.isDragging) {
        dispatch(clearSelection());
        dispatch(selectObject(boardObject.id));
      }
      dispatch(setIsDragging(false));
      dispatch(setIsHoldingMouse(false));
    }
  };

  const position = toCameraPoint(boardObject.position, camera);

  return (
    <div
      onMouseUp={handleMouseUp}
      className={styles.boardObject}
      style={{
        top: position.y,
        left: position.x,
        outline: boardObject.isSelected ? "1px solid black" : "",
      }}
    >
      {child}
    </div>
  );
}

export default BoardObjectComponent;
