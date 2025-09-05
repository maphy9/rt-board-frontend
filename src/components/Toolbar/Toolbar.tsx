import React from "react";
import styles from "./styles.module.css";
import Tool from "./Tool";
import useUniversalInput from "@/hooks/useUniversalInput";

function Toolbar() {
  const { stopPropagation } = useUniversalInput();

  return (
    <div
      onMouseDown={stopPropagation}
      onMouseUp={stopPropagation}
      className={styles.toolbar}
    >
      <Tool selectedTool="cursor" iconPath="cursor.svg" />
      <Tool selectedTool="text" iconPath="text.svg" />
      <Tool selectedTool="note" iconPath="note.svg" />
    </div>
  );
}

export default Toolbar;
