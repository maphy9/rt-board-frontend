import { RootState } from "@/state/store";
import BoardObjects from "@/types/boardObjects";
import TextObject from "@/types/textObject";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { RgbaColorPicker } from "react-colorful";
import { setFontColor } from "@/state/slices/boardObjectsSlice";

function FontColorOption({ id }: { id: number }) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const textObject = boardObjects.objects[id] as TextObject;
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState({ ...textObject.fontColor });

  const handleOpen = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleChange = (newColor) => {
    setColor(newColor);
    dispatch(setFontColor({ id: textObject.id, fontColor: newColor }));
  };

  return (
    <div className={styles.optionContainer}>
      <img
        src="fontColor.svg"
        className={styles.optionIcon}
        onClick={handleOpen}
      />

      {!isOpen ? (
        <></>
      ) : (
        <div className={styles.colorPickerContainer}>
          <RgbaColorPicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
}

export default FontColorOption;
