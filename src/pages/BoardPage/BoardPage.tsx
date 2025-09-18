import React from "react";
import styles from "./styles.module.css";
import Toolbar from "@/components/Toolbar/Toolbar";
import Board from "@/components/Board/Board";
import useKeyboard from "@/hooks/useKeyboard";
import BoardMenu from "@/components/BoardMenu/BoardMenu";
import HistoryControllers from "@/components/HistoryControllers/HistoryControllers";

function BoardPage() {
  useKeyboard();

  return (
    <div className={styles.boardPage}>
      <HistoryControllers />

      <Toolbar />

      <Board />

      <BoardMenu />
    </div>
  );
}

export default BoardPage;
