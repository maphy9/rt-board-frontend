import React from "react";
import styles from "./styles.module.css";
import Toolbar from "@/components/Toolbar/Toolbar";
import Board from "@/components/Board/Board";
import useKeyboard from "@/hooks/useKeyboard";

function BoardPage() {
  useKeyboard();

  return (
    <div className={styles.boardPage}>
      <Toolbar />

      <Board />
    </div>
  );
}

export default BoardPage;
