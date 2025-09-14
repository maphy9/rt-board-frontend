import React from "react";
import styles from "./styles.module.css";

import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import useUniversalInput from "@/hooks/useUniversalInput";
import { getCssColor } from "@/types/color";
import ThemeChanger from "./ThemeChanger";

function BoardMenuOptions() {
  const { theme } = useSelector((state: RootState) => state.theme);

  const { stopPropagation } = useUniversalInput();

  return (
    <div
      onMouseDown={stopPropagation}
      onMouseUp={stopPropagation}
      style={
        {
          "--onPrimary": getCssColor(theme.onPrimary),
          "--secondaryShadow": getCssColor({ ...theme.secondary, a: 0.15 }),
        } as any
      }
      className={styles.boardMenuOptions}
    >
      <ThemeChanger />
    </div>
  );
}

export default BoardMenuOptions;
