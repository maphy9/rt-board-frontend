import React from "react";
import styles from "./styles.module.css";
import Tool from "./Tool";
import useUniversalInput from "@/hooks/useUniversalInput";
import ShapeTool from "./ShapeTools";
import { getCssColor } from "@/types/color";
import useTheme from "@/hooks/useTheme";

function Toolbar() {
  const { stopPropagation } = useUniversalInput();
  const { theme } = useTheme();

  return (
    <div
      onMouseDown={stopPropagation}
      onMouseUp={stopPropagation}
      className={styles.toolbar}
      style={
        {
          "--primary": getCssColor(theme.primary),
          "--secondaryShadow": getCssColor({ ...theme.secondary, a: 0.15 }),
        } as any
      }
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
