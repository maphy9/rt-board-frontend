import useGlobalHooks from "@/hooks/globalHooks";
import { RootState } from "@/state/store";
import BoardObjects from "@/types/boardObjects";
import TextObject from "@/types/textObject";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { setFontSize } from "@/state/slices/boardObjectsSlice";

function FontSizeOption({ id }: { id: string }) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const textObject = boardObjects.objects[id] as TextObject;
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(
    textObject.fontSize + ""
  );

  const handleOpen = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    let newFontSize = Number.parseInt(value);
    if (Number.isNaN(newFontSize)) {
      return;
    }
    newFontSize = Math.max(1, newFontSize);
    dispatch(setFontSize({ id: textObject.id, fontSize: newFontSize }));
  };

  const _setFontSize = (newFontSize) => {
    setInputValue(newFontSize + "");
    dispatch(setFontSize({ id: textObject.id, fontSize: newFontSize }));
    setIsOpen(false);
  };

  const { stopPropagation } = useGlobalHooks();

  return (
    <div className={styles.optionContainer}>
      <img
        src="fontSize.svg"
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
              onClick={() => _setFontSize(16)}
              className={styles.dropdownOption}
            >
              <span>Small</span>
              <span>16px</span>
            </div>
            <div
              onClick={() => _setFontSize(24)}
              className={styles.dropdownOption}
            >
              <span>Medium</span>
              <span>24px</span>
            </div>
            <div
              onClick={() => _setFontSize(36)}
              className={styles.dropdownOption}
            >
              <span>Large</span>
              <span>36px</span>
            </div>
            <div
              onClick={() => _setFontSize(48)}
              className={styles.dropdownOption}
            >
              <span>Extra Large</span>
              <span>48px</span>
            </div>
          </div>
          <div className={styles.dropdownInputContainer}>
            <label htmlFor="fontSizeInput">Custom font size</label>
            <input
              name="fontSizeInput"
              className={styles.dropdownInput}
              value={inputValue}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FontSizeOption;
