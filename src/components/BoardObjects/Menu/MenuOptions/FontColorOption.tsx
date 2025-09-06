import { RootState } from "@/state/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { RgbaColorPicker } from "react-colorful";
import { setFontColor } from "@/state/slices/boardObjectsSlice";
import TextObject from "@/types/BoardObjects/textObject";
import BoardObjects from "@/types/BoardObjects/boardObjects";

function FontColorOption({ id, isOpen, toggleIsOpen }) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const textObject = boardObjects.objects[id] as TextObject;
  const dispatch = useDispatch();

  const [color, setColor] = useState({ ...textObject.fontColor });

  const handleOpen = (event) => {
    event.stopPropagation();

    toggleIsOpen();
  };

  const handleChange = (newColor) => {
    setColor(newColor);
    dispatch(setFontColor({ id: textObject.id, fontColor: newColor }));
  };

  return (
    <div className={styles.optionContainer}>
      <img
        className={styles.optionIcon}
        style={
          {
            backgroundColor: isOpen ? "rgb(46, 103, 248)" : "black",
            WebkitMaskImage: "url(fontColor.svg)",
            maskImage: "url(fontColor.svg)",
          } as any
        }
        onClick={handleOpen}
      />

      {!isOpen ? (
        <></>
      ) : (
        <div className={styles.colorPickerContainer}>
          <span className={styles.optionDescription}>Font color</span>
          <RgbaColorPicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
}

export default FontColorOption;
