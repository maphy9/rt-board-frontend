import React from "react";
import styles from "./styles.module.css";
import Tool from "./Tool";
import useUniversalInput from "@/hooks/useUniversalInput";
import ShapeTool from "./ShapeTools";

function Toolbar() {
  const { stopPropagation } = useUniversalInput();

  return (
    <div
      onMouseDown={stopPropagation}
      onMouseUp={stopPropagation}
      className={styles.toolbar}
    >
      <Tool selectedTool="cursor" />
      <Tool selectedTool="text" />
      <Tool selectedTool="note" />
      <Tool selectedTool="image" />
      <ShapeTool />
    </div>
  );
}

export default Toolbar;
