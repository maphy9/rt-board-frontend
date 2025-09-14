import useUniversalInput from "@/hooks/useUniversalInput";
import { RootState } from "@/state/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { setFontSize } from "@/state/slices/boardObjectsSlice";
import TextObject from "@/types/BoardObjects/textObject";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import { getCssColor } from "@/types/color";

function FontSizeOption({
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
  const textObject = boardObjects.objects[id] as TextObject;
  const dispatch = useDispatch();

  const { theme } = useSelector((state: RootState) => state.theme);

  const [inputValue, setInputValue] = useState<string>(
    textObject.fontSize + ""
  );

  const handleOpen = (event) => {
    event.stopPropagation();

    toggleIsOpen();
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

    toggleIsOpen();
  };

  const { stopPropagation } = useUniversalInput();

  return (
    <div
      className={styles.optionContainer}
      style={
        {
          "--primary": getCssColor(theme.primary),
          "--onPrimary": getCssColor(theme.onPrimary),
          "--secondary": getCssColor(theme.secondary),
          "--onSecondary": getCssColor(theme.onSecondary),
          "--surface": getCssColor(theme.surface),
        } as React.CSSProperties
      }
    >
      <img
        className={styles.optionIcon}
        style={
          {
            backgroundColor: isOpen
              ? getCssColor(theme.surface)
              : getCssColor(theme.secondary),
            WebkitMaskImage: "url(fontSize.svg)",
            maskImage: "url(fontSize.svg)",
          } as any
        }
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
          <span className={styles.optionDescription}>Background color</span>

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
