import { RootState } from "@/state/store";
import BoardObject from "@/types/boardObject";
import Camera from "@/types/camera";
import { toCameraPoint } from "@/types/point";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TextObject from "@/types/textObject";
import TextObjectComponent from "./TextObject";
import styles from "./styles.module.css";
import Input from "@/types/input";
import useBoardObjectMouse from "@/hooks/useBoardObjectMouse";

function BoardObjectComponent({ boardObject }: { boardObject: BoardObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const input: Input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

  let child = <span>Something went wrong</span>;
  if (boardObject.type == "text") {
    child = <TextObjectComponent textObject={boardObject as TextObject} />;
  }

  const { handleMouseUp } = useBoardObjectMouse(boardObject);

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
