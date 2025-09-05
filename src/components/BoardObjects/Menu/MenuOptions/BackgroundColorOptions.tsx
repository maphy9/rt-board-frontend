import { RootState } from "@/state/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { RgbaColorPicker } from "react-colorful";
import {
  setBackgroundColor,
  setFontColor,
} from "@/state/slices/boardObjectsSlice";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import NoteObject from "@/types/BoardObjects/noteObject";

function BackgroundColorOption({ id, isOpen, toggleIsOpen }) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const noteObject = boardObjects.objects[id] as NoteObject;
  const dispatch = useDispatch();

  const [color, setColor] = useState({ ...noteObject.fontColor });

  const handleOpen = (event) => {
    event.stopPropagation();

    toggleIsOpen();
  };

  const handleChange = (newColor) => {
    setColor(newColor);
    dispatch(
      setBackgroundColor({ id: noteObject.id, backgroundColor: newColor })
    );
  };

  return (
    <div className={styles.optionContainer}>
      <img
        className={styles.optionIcon}
        style={
          {
            backgroundColor: isOpen ? "rgb(46, 103, 248)" : "black",
            "-webkit-mask-image": "url(backgroundColor.svg)",
            "mask-image": "url(backgroundColor.svg)",
          } as any
        }
        onClick={handleOpen}
      />

      {!isOpen ? (
        <></>
      ) : (
        <div className={styles.colorPickerContainer}>
          <span className={styles.optionDescription}>Background color</span>
          <RgbaColorPicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
}

export default BackgroundColorOption;
