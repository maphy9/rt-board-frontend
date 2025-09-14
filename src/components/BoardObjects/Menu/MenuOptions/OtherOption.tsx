import useUniversalInput from "@/hooks/useUniversalInput";
import { RootState } from "@/state/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import {
  bringToFront,
  bringToRear,
  deleteObject,
  addCopy,
  toggleIsFlippedVertically,
  toggleIsFlippedHorizontally,
} from "@/state/slices/boardObjectsSlice";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import { getCssColor } from "@/types/color";
import Theme from "@/types/theme";

function OtherOption({
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
  const boardObject = boardObjects.objects[id];
  const dispatch = useDispatch();

  const theme: Theme = useSelector((state: RootState) => state.theme);

  const handleOpen = (event) => {
    event.stopPropagation();

    toggleIsOpen();
  };

  const handleDelete = () => {
    dispatch(deleteObject(id));

    toggleIsOpen();
  };

  const handleDuplicate = () => {
    dispatch(addCopy(boardObject));

    toggleIsOpen();
  };

  const handleBringToFront = () => {
    dispatch(bringToFront(id));

    toggleIsOpen();
  };

  const handleBringToRear = () => {
    dispatch(bringToRear(id));

    toggleIsOpen();
  };

  const handleFlipHorizontally = () => {
    dispatch(toggleIsFlippedHorizontally(id));

    toggleIsOpen();
  };

  const handleFlipVertically = () => {
    dispatch(toggleIsFlippedVertically(id));

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
            WebkitMaskImage: "url(dots.svg)",
            maskImage: "url(dots.svg)",
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
          <span className={styles.optionDescription}>Other options</span>

          <div className={styles.dropdownOptions}>
            <div className={styles.dropdownOption} onClick={handleDuplicate}>
              <span>Duplicate</span>
              <img
                className={styles.otherOptionsIcon}
                style={{
                  WebkitMaskImage: "url(duplicate.svg)",
                  maskImage: "url(duplicate.svg)",
                }}
              />
            </div>
            <div className={styles.dropdownOption} onClick={handleDelete}>
              <span>Delete</span>
              <img
                className={styles.otherOptionsIcon}
                style={{
                  WebkitMaskImage: "url(delete.svg)",
                  maskImage: "url(delete.svg)",
                }}
              />
            </div>
            <div className={styles.dropdownOption} onClick={handleBringToFront}>
              <span>Bring to the front</span>
              <img
                className={styles.otherOptionsIcon}
                style={{
                  WebkitMaskImage: "url(bringToFront.svg)",
                  maskImage: "url(bringToFront.svg)",
                }}
              />
            </div>
            <div className={styles.dropdownOption} onClick={handleBringToRear}>
              <span>Bring to the rear</span>
              <img
                className={styles.otherOptionsIcon}
                style={{
                  WebkitMaskImage: "url(bringToRear.svg)",
                  maskImage: "url(bringToRear.svg)",
                }}
              />
            </div>
            <div
              className={styles.dropdownOption}
              onClick={handleFlipHorizontally}
            >
              <span>Flip horizontally</span>
              <img
                className={styles.otherOptionsIcon}
                style={{
                  WebkitMaskImage: "url(flip.svg)",
                  maskImage: "url(flip.svg)",
                }}
              />
            </div>
            <div
              className={styles.dropdownOption}
              onClick={handleFlipVertically}
            >
              <span>Flip vertically</span>
              <img
                className={styles.otherOptionsIcon}
                style={{
                  transform: "rotate(90deg)",
                  WebkitMaskImage: "url(flip.svg)",
                  maskImage: "url(flip.svg)",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OtherOption;
