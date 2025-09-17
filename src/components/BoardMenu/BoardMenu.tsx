import useUniversalInput from "@/hooks/useUniversalInput";
import { RootState } from "@/state/store";
import { getCssColor } from "@/types/color";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import BoardMenuOptions from "./BoardMenuOptions";

function BoardMenu() {
  const { theme } = useSelector((state: RootState) => state.theme);

  const { stopPropagation, stopPropagationAndEdit } = useUniversalInput();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseDown={stopPropagation}
        onMouseUp={stopPropagationAndEdit}
        style={
          {
            "--onPrimary": getCssColor(theme.onPrimary),
            "--secondaryShadow": getCssColor({ ...theme.secondary, a: 0.15 }),
          } as any
        }
        className={styles.boardMenu}
      >
        <img
          className={styles.boardMenuIcon}
          style={
            {
              backgroundColor: isOpen
                ? getCssColor(theme.surface)
                : getCssColor(theme.secondary),
              WebkitMaskImage: "url(burgerMenu.svg)",
              maskImage: "url(burgerMenu.svg)",
            } as any
          }
        />
      </div>

      {isOpen ? <BoardMenuOptions /> : <></>}
    </>
  );
}

export default BoardMenu;
