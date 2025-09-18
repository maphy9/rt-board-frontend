import React, { Children, useEffect, useState } from "react";
import { toCameraPoint } from "@/types/point";
import Camera, { scaleToCamera } from "@/types/camera";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  OBJECT_MENU_MARGIN,
  OBJECT_MENU_OPTION_SIZE,
} from "@/constants/boardObjectConstants";
import useUniversalInput from "@/hooks/useUniversalInput";
import styles from "./styles.module.css";
import Input from "@/types/input";
import MenuOption from "./MenuOption";
import BoardObject from "@/types/BoardObjects/boardObject";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import { getCssColor } from "@/types/color";

function BoardObjectMenu({
  boardObject,
  children,
}: {
  boardObject: BoardObject;
  children: any;
}) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const input: Input = useSelector((state: RootState) => state.input);
  const camera: Camera = useSelector((state: RootState) => state.camera);

  const { theme } = useSelector((state: RootState) => state.theme);

  const position = toCameraPoint(
    {
      x: boardObject.position.x,
      y: boardObject.position.y,
    },
    camera
  );

  if (Math.abs(boardObject.rotationAngle) <= 90) {
    position.y -= OBJECT_MENU_OPTION_SIZE + OBJECT_MENU_MARGIN;
  } else {
    position.y +=
      scaleToCamera(boardObject.size.height, camera) + OBJECT_MENU_MARGIN;
  }

  const { stopPropagationAndEdit } = useUniversalInput();

  const showMenu =
    boardObject.isSelected &&
    Object.keys(boardObjects.selected).length === 1 &&
    !input.isDragging &&
    boardObject.resizingCorner === null &&
    boardObject.rotatingPoint === null;

  const numberOfOptions = children.length;
  const [isOpen, setIsOpen] = useState(new Array(numberOfOptions).fill(false));
  const options = Children.map(children, (child, index) => (
    <MenuOption
      id={boardObject.id}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      index={index}
    >
      {child}
    </MenuOption>
  ));

  useEffect(() => {
    if (!boardObject.isSelected) {
      setIsOpen((prev) => new Array(prev.length).fill(false));
    }
  }, [boardObject.isSelected]);

  return showMenu ? (
    <div
      className={styles.boardObjectMenu}
      onMouseDown={stopPropagationAndEdit}
      onMouseUp={stopPropagationAndEdit}
      style={{
        border: `1px solid ${getCssColor(theme.secondary)}`,
        backgroundColor: getCssColor(theme.primary),
        transform: `translate(${position.x}px, ${position.y}px)`,
        willChange: "transform",
      }}
    >
      {...options}
    </div>
  ) : (
    <></>
  );
}

export default BoardObjectMenu;
