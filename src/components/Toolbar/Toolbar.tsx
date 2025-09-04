import React from "react";
import styles from "./styles.module.css";
import Tool from "./Tool";
import useGlobalHooks from "@/hooks/globalHooks";

function Toolbar() {
  const { stopPropagation } = useGlobalHooks();

  return (
    <div
      onMouseDown={stopPropagation}
      onMouseUp={stopPropagation}
      className={styles.toolbar}
    >
      <Tool selectedTool="cursor" iconPath="cursor.svg" />
      <Tool selectedTool="text" iconPath="text.svg" />
    </div>
  );
}

export default Toolbar;
