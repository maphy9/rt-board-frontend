import useGlobalHooks from "@/hooks/globalHooks";
import { RootState } from "@/state/store";
import BoardObjects from "@/types/boardObjects";
import TextObject from "@/types/textObject";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import {
  bringToFront,
  bringToRear,
  deleteObject,
  insertCopy,
} from "@/state/slices/boardObjectsSlice";

function OtherOption({ id }: { id: number }) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const textObject = boardObjects.objects[id] as TextObject;
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleDelete = () => {
    dispatch(deleteObject(id));
    setIsOpen(false);
  };

  const handleDuplicate = () => {
    dispatch(insertCopy(textObject));
    setIsOpen(false);
  };

  const handleBringToFront = () => {
    dispatch(bringToFront(id));
    setIsOpen(false);
  };

  const handleBringToRear = () => {
    dispatch(bringToRear(id));
    setIsOpen(false);
  };

  const { stopPropagation } = useGlobalHooks();

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
