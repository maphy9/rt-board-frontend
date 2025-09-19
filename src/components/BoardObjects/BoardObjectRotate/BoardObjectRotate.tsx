import React from "react";
import styles from "./styles.module.css";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import BoardObject from "@/types/BoardObjects/boardObject";
import Input from "@/types/input";
import Camera, { scaleToCamera, scaleToReal } from "@/types/camera";
import { addOffset, toCameraPoint } from "@/types/point";
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
  const realSize = scaleToReal(size, camera);
  const realPosition = addOffset(
    {
      x: (boardObject.size.width - realSize) / 2,
      y: boardObject.size.height + 30,
    },
    boardObject.position
  );
  const position = toCameraPoint(realPosition, camera);
  const origin = {
    x: scaleToCamera(realSize / 2, camera),
    y: scaleToCamera(-30 - boardObject.size.height / 2, camera),
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
        transform: `translate(${position.x}px, ${position.y}px) rotate(${boardObject.rotationAngle}deg)`,
        transformOrigin: `50% ${origin.y}px`,
        willChange: "transform",
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
