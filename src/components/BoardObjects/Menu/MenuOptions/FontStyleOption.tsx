import useGlobalHooks from "@/hooks/globalHooks";
import { RootState } from "@/state/store";
import BoardObjects from "@/types/boardObjects";
import TextObject from "@/types/textObject";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { setFontStyle } from "@/state/slices/boardObjectsSlice";

function FontStyleOption({ id }: { id: number }) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const textObject = boardObjects.objects[id] as TextObject;
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const _setFontStyle = (newFontStyle) => {
    if (textObject.fontStyle === newFontStyle) {
      newFontStyle = "normal";
    }
    dispatch(setFontStyle({ id: textObject.id, fontStyle: newFontStyle }));
    setIsOpen(false);
  };

  const { stopPropagation } = useGlobalHooks();

  return (
    <div className={styles.dropDownContainer}>
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
