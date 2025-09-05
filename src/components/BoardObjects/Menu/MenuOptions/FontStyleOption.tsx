import useUniversalInput from "@/hooks/useUniversalInput";
import { RootState } from "@/state/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { setFontStyle } from "@/state/slices/boardObjectsSlice";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import TextObject from "@/types/BoardObjects/textObject";

function FontStyleOption({ id, isOpen, toggleIsOpen }) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const textObject = boardObjects.objects[id] as TextObject;
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    event.stopPropagation();

    toggleIsOpen();
  };

  const _setFontStyle = (newFontStyle) => {
    if (textObject.fontStyle === newFontStyle) {
      newFontStyle = "normal";
    }
    dispatch(setFontStyle({ id: textObject.id, fontStyle: newFontStyle }));

    toggleIsOpen();
  };

  const { stopPropagation } = useUniversalInput();

  return (
    <div className={styles.optionContainer}>
      <img
        src="fontStyle.svg"
        className={styles.optionIcon}
        onClick={handleOpen}
      />

      {!isOpen ? (
        <></>
      ) : (
        <div
          className={styles.dropdown}
          onMouseDown={stopPropagation}
          onMouseUp={stopPropagation}
        >
          <div className={styles.dropdownOptions}>
            <div
              onClick={() => _setFontStyle("bold")}
              className={styles.dropdownOption}
            >
              <b>Bold</b>
            </div>
            <div
              onClick={() => _setFontStyle("italic")}
              className={styles.dropdownOption}
            >
              <i>Italic</i>
            </div>
            <div
              onClick={() => _setFontStyle("underline")}
              className={styles.dropdownOption}
            >
              <u>Underline</u>
            </div>
            <div
              onClick={() => _setFontStyle("line-through")}
              className={styles.dropdownOption}
            >
              <s>Line-through</s>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FontStyleOption;
