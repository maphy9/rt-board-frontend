import useUniversalInput from "@/hooks/useUniversalInput";
import { RootState } from "@/state/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { setFontStyle } from "@/state/slices/boardObjectsSlice";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import TextObject from "@/types/BoardObjects/textObject";
import { getCssColor } from "@/types/color";
import { boardObjectCleanCopy } from "@/types/BoardObjects/boardObject";
import { addHistoryItem } from "@/state/slices/historySlice";

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
  const dispatch = useDispatch();
  const { stopPropagationAndEdit } = useUniversalInput();
  const { theme } = useSelector((state: RootState) => state.theme);

  const handleOpen = (event) => {
    stopPropagationAndEdit(event);

    toggleIsOpen();
  };

  const _setFontStyle = (newFontStyle) => {
    if (textObject.fontStyle === newFontStyle) {
      newFontStyle = "normal";
    }

    const oldState = boardObjectCleanCopy(textObject);
    const data = [
      { old: oldState, new: { ...oldState, fontStyle: newFontStyle } },
    ];
    dispatch(addHistoryItem({ type: "edit", data }));
    dispatch(setFontStyle({ id: textObject.id, fontStyle: newFontStyle }));
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
