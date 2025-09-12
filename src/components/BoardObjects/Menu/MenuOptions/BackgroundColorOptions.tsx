import { RootState } from "@/state/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { RgbaColorPicker } from "react-colorful";
import { setBackgroundColor } from "@/state/slices/boardObjectsSlice";
import BoardObjects from "@/types/BoardObjects/boardObjects";

function BackgroundColorOption({
  id,
  isOpen,
  toggleIsOpen,
}: {
  id?: string;
  isOpen?: boolean;
  toggleIsOpen?: () => void;
}) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const boardObject = boardObjects.objects[id] as any;
  const dispatch = useDispatch();

  const [color, setColor] = useState({ ...boardObject.backgroundColor });

  const handleOpen = (event) => {
    event.stopPropagation();

    toggleIsOpen();
  };

  const handleChange = (newColor) => {
    setColor(newColor);
    dispatch(
      setBackgroundColor({ id: boardObject.id, backgroundColor: newColor })
    );
  };

  return (
    <div className={styles.optionContainer}>
      <img
        className={styles.optionIcon}
        style={
          {
            backgroundColor: isOpen ? "rgb(46, 103, 248)" : "black",
            WebkitMaskImage: "url(backgroundColor.svg)",
            maskImage: "url(backgroundColor.svg)",
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
