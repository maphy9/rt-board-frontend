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
} from "@/state/slices/boardObjectsSlice";
import BoardObjects from "@/types/BoardObjects/boardObjects";

function OtherOption({ id, isOpen, toggleIsOpen }) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const boardObject = boardObjects.objects[id];
  const dispatch = useDispatch();

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

  const { stopPropagation } = useUniversalInput();

  return (
    <div className={styles.optionContainer}>
      <img
        className={styles.optionIcon}
        style={
          {
            backgroundColor: isOpen ? "rgb(46, 103, 248)" : "black",
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
            </div>
            <div className={styles.dropdownOption} onClick={handleDelete}>
              <span>Delete</span>
            </div>
            <div className={styles.dropdownOption} onClick={handleBringToFront}>
              <span>Bring to the front</span>
            </div>
            <div className={styles.dropdownOption} onClick={handleBringToRear}>
              <span>Bring to the rear</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OtherOption;
