import useUniversalInput from "@/hooks/useUniversalInput";
import { RootState } from "@/state/store";
import BoardObjects from "@/types/boardObjects";
import TextObject from "@/types/textObject";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import {
  bringToFront,
  bringToRear,
  deleteObject,
  addCopy,
} from "@/state/slices/boardObjectsSlice";

function OtherOption({ id, isOpen, toggleIsOpen }) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const textObject = boardObjects.objects[id] as TextObject;
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
    dispatch(addCopy(textObject));

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
      <img src="dots.svg" className={styles.optionIcon} onClick={handleOpen} />

      {!isOpen ? (
        <></>
      ) : (
        <div
          className={styles.dropdown}
          onMouseDown={stopPropagation}
          onMouseUp={stopPropagation}
        >
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
