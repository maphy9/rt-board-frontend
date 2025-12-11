"use client";

import styles from "./styles.module.css";
import Toolbar from "@/components/Toolbar/Toolbar";
import Board from "@/components/Board/Board";
import BoardMenu from "@/components/BoardMenu/BoardMenu";
import HistoryControllers from "@/components/HistoryControllers/HistoryControllers";
import { WebSocketProvider } from "@/context/websocketContext";

export default function Page() {
  return (
    <WebSocketProvider>
      <div className={styles.boardPage}>
        <HistoryControllers />

        <Toolbar />

        <Board />

        <BoardMenu />
      </div>
    </WebSocketProvider>
  );
}
