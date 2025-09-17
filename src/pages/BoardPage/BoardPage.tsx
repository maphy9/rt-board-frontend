import React, { useLayoutEffect } from "react";
import styles from "./styles.module.css";
import Toolbar from "@/components/Toolbar/Toolbar";
import Board from "@/components/Board/Board";
import useKeyboard from "@/hooks/useKeyboard";
import BoardMenu from "@/components/BoardMenu/BoardMenu";
import { useDispatch } from "react-redux";
import { setTheme } from "@/state/slices/themeSlice";
import HistoryControllers from "@/components/HistoryControllers/HistoryControllers";

function BoardPage() {
  useKeyboard();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    dispatch(setTheme(savedTheme));
  }, []);

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
