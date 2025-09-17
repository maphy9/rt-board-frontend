import { RootState } from "@/state/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { RgbaColorPicker } from "react-colorful";
import {
  setFontColor,
  setOldObjectState,
} from "@/state/slices/boardObjectsSlice";
import TextObject from "@/types/BoardObjects/textObject";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import { getCssColor } from "@/types/color";
import { boardObjectCleanCopy } from "@/types/BoardObjects/boardObject";
import useUniversalInput from "@/hooks/useUniversalInput";

function FontColorOption({
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
  const { stopPropagationAndEdit } = useUniversalInput();

  const [color, setColor] = useState({ ...textObject.fontColor });

  const handleOpen = (event) => {
    stopPropagationAndEdit(event);

    toggleIsOpen();
  };

  const handleChange = (newColor) => {
    setColor(newColor);

    if (boardObjects.oldObjectState === null) {
      dispatch(setOldObjectState(boardObjectCleanCopy(textObject)));
    }

    dispatch(setFontColor({ id: textObject.id, fontColor: newColor }));
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
          <RgbaColorPicker
            color={color}
            onChange={handleChange}
            onMouseUp={stopPropagationAndEdit}
          />
        </div>
      )}
    </div>
  );
}

export default FontColorOption;
