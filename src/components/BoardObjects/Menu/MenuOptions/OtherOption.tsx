import useUniversalInput from "@/hooks/useUniversalInput";
import { RootState } from "@/state/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import {
  deleteObject,
  toggleIsFlippedVertically,
  toggleIsFlippedHorizontally,
  changeOrder,
  addObject,
} from "@/state/slices/boardObjectsSlice";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import { getCssColor } from "@/types/color";
import { addHistoryItem } from "@/state/slices/historySlice";
import getID from "@/utils/id";
import { addOffset } from "@/types/point";
import { OBJECT_COPY_MARGIN } from "@/constants/boardObjectConstants";
import { boardObjectCleanCopy } from "@/types/BoardObjects/boardObject";

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
  const { stopPropagationAndEdit } = useUniversalInput();
  const { theme } = useSelector((state: RootState) => state.theme);

  const handleOpen = (event) => {
    stopPropagationAndEdit(event);

    toggleIsOpen();
  };

  const handleDelete = () => {
    dispatch(
      addHistoryItem({
        type: "delete",
        data: [{ ...boardObject, isSelected: false, isEditing: false }],
      })
    );
    dispatch(deleteObject(id));

    toggleIsOpen();
  };

  const handleDuplicate = () => {
    const copy = {
      ...JSON.parse(JSON.stringify(boardObject)),
      id: getID(),
      isSelected: false,
      isEdited: false,
      position: addOffset(boardObject.position, OBJECT_COPY_MARGIN),
    };
    dispatch(addObject(copy));
    dispatch(addHistoryItem({ type: "add", data: [copy] }));

    toggleIsOpen();
  };

  const handleBringToFront = () => {
    const newOrder = boardObjects.order.filter((_id) => _id !== id);
    newOrder.push(id);
    dispatch(
      addHistoryItem({
        type: "changeOrder",
        data: { old: boardObjects.order, new: newOrder },
      })
    );
    dispatch(changeOrder(newOrder));

    toggleIsOpen();
  };

  const handleBringToRear = () => {
    const newOrder = boardObjects.order.filter((_id) => _id !== id);
    newOrder.unshift(id);
    dispatch(
      addHistoryItem({
        type: "changeOrder",
        data: { old: boardObjects.order, new: newOrder },
      })
    );
    dispatch(changeOrder(newOrder));

    toggleIsOpen();
  };

  const handleFlipHorizontally = () => {
    const oldState = boardObjectCleanCopy(boardObject);
    const data = [
      {
        old: oldState,
        new: {
          ...oldState,
          isFlippedHorizontally: !oldState.isFlippedHorizontally,
        },
      },
    ];
    dispatch(addHistoryItem({ type: "edit", data }));
    dispatch(toggleIsFlippedHorizontally(id));

    toggleIsOpen();
  };

  const handleFlipVertically = () => {
    const oldState = boardObjectCleanCopy(boardObject);
    const data = [
      {
        old: oldState,
        new: {
          ...oldState,
          isFlippedVertically: !oldState.isFlippedVertically,
        },
      },
    ];
    dispatch(addHistoryItem({ type: "edit", data }));
    dispatch(toggleIsFlippedVertically(id));

    toggleIsOpen();
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
          onMouseDown={stopPropagationAndEdit}
          onMouseUp={stopPropagationAndEdit}
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
