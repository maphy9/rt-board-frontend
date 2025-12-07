import useUniversalInput from "@/hooks/useUniversalInput";
import { RootState } from "@/state/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import TextObject from "@/types/BoardObjects/textObject";
import { getCssColor } from "@/types/color";
import useBoardActions from "@/hooks/useBoardActions";

function FontStyleOption({
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
  const { stopPropagationAndEdit } = useUniversalInput();
  const { theme } = useSelector((state: RootState) => state.theme);
  const { changeFontStyle } = useBoardActions();

  const handleOpen = (event) => {
    stopPropagationAndEdit(event);

    toggleIsOpen();
  };

  const handleSetFontStyle = (newFontStyle) => {
    if (textObject.fontStyle === newFontStyle) {
      newFontStyle = "normal";
    }

    changeFontStyle(textObject, newFontStyle);
  };

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
            WebkitMaskImage: "url(fontStyle.svg)",
            maskImage: "url(fontStyle.svg)",
          } as any
        }
        onClick={handleOpen}
      />

      {!isOpen ? (
        <></>
      ) : (
        <div
          className={styles.dropdown}
          onMouseDown={stopPropagationAndEdit}
          onMouseUp={stopPropagationAndEdit}
        >
          <span className={styles.optionDescription}>Font style</span>

          <div className={styles.dropdownOptions}>
            <div
              onClick={() => handleSetFontStyle("bold")}
              className={styles.dropdownOption}
            >
              <b>Bold</b>
            </div>
            <div
              onClick={() => handleSetFontStyle("italic")}
              className={styles.dropdownOption}
            >
              <i>Italic</i>
            </div>
            <div
              onClick={() => handleSetFontStyle("underline")}
              className={styles.dropdownOption}
            >
              <u>Underline</u>
            </div>
            <div
              onClick={() => handleSetFontStyle("line-through")}
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
