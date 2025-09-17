import useUniversalInput from "@/hooks/useUniversalInput";
import { RootState } from "@/state/store";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { getCssColor } from "@/types/color";
import useHistory from "@/hooks/useHistory";

function HistoryControllers() {
  const { stopPropagation, stopPropagationAndEdit } = useUniversalInput();
  const { theme } = useSelector((state: RootState) => state.theme);
  const { handleGoToFuture, handleGoToPast, hasFuture, hasPast } = useHistory();

  return (
    <div
      onMouseDown={stopPropagation}
      onMouseUp={stopPropagationAndEdit}
      className={styles.historyControllers}
      style={
        {
          "--secondary": getCssColor(theme.secondary),
          "--onPrimary": getCssColor(theme.onPrimary),
          "--secondaryShadow": getCssColor({ ...theme.secondary, a: 0.15 }),
        } as any
      }
    >
      <div className={styles.historyController} onClick={handleGoToPast}>
        <img
          style={{ transform: "scaleX(-1)", opacity: hasPast() ? 1 : 0.5 }}
          className={styles.historyControllerIcon}
        />
      </div>

      <div className={styles.historyController} onClick={handleGoToFuture}>
        <img
          style={{
            opacity: hasFuture() ? 1 : 0.5,
          }}
          className={styles.historyControllerIcon}
        />
      </div>
    </div>
  );
}

export default HistoryControllers;
