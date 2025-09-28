import { RootState } from "@/state/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { RgbaColorPicker } from "react-colorful";
import {
  setBackgroundColor,
  setOldObjectState,
} from "@/state/slices/boardObjectsSlice";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import { getCssColor } from "@/types/color";
import useUniversalInput from "@/hooks/useUniversalInput";
import { boardObjectCleanCopy } from "@/types/BoardObjects/boardObject";

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
  const { stopPropagationAndEdit } = useUniversalInput();
  const { theme } = useSelector((state: RootState) => state.theme);

  const [color, setColor] = useState({ ...boardObject.backgroundColor });

  const handleOpen = (event) => {
    stopPropagationAndEdit(event);

    toggleIsOpen();
  };

  const handleChange = (newColor) => {
    setColor(newColor);

    if (boardObjects.oldObjectState === null) {
      dispatch(setOldObjectState(boardObjectCleanCopy(boardObject)));
    }
    dispatch(
      setBackgroundColor({ id: boardObject.id, backgroundColor: newColor })
    );
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

export default BackgroundColorOption;
