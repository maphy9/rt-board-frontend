import React from "react";
import styles from "./styles.module.css";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import BoardObject from "@/types/BoardObjects/boardObject";
import Input from "@/types/input";
import Camera, { scaleToCamera } from "@/types/camera";
import { addOffset } from "@/types/point";
import { OBJECT_ROTATE_SIZE } from "@/constants/boardObjectConstants";
import { setRotatingPoint } from "@/state/slices/boardObjectsSlice";
import { getCssColor } from "@/types/color";
import useUniversalInput from "@/hooks/useUniversalInput";

function BoardObjectRotate({ boardObject }: { boardObject: BoardObject }) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const input: Input = useSelector((state: RootState) => state.input);
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const dispatch = useDispatch();
  const { stopPropagationAndEdit } = useUniversalInput();
  const { theme } = useSelector((state: RootState) => state.theme);

  const size = Math.max(
    scaleToCamera(OBJECT_ROTATE_SIZE, camera),
    OBJECT_ROTATE_SIZE
  );

  const position = {
    x: (scaleToCamera(boardObject.size.width, camera) - size) / 2,
    y: scaleToCamera(boardObject.size.height + 30, camera),
  };

  const canRotate =
    boardObject.isSelected &&
    !boardObject.isEditing &&
    Object.keys(boardObjects.selected).length === 1 &&
    !input.isDragging;

  const handleMouseDown = (event) => {
    stopPropagationAndEdit(event);

    const rotatingPoint = addOffset(boardObject.position, {
      x: boardObject.size.width / 2,
      y: boardObject.size.height / 2,
    });
    dispatch(setRotatingPoint({ id: boardObject.id, rotatingPoint }));
  };

  return canRotate ? (
    <div
      onMouseDown={handleMouseDown}
      className={styles.boardObjectRotate}
      style={{
        border: `1px solid ${getCssColor(theme.secondary)}`,
        backgroundColor: getCssColor(theme.primary),
        top: position.y,
        left: position.x,
        width: size,
        height: size,
        borderRadius: size,
      }}
    />
  ) : (
    <></>
  );
}

export default BoardObjectRotate;
