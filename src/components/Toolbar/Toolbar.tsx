import React from "react";
import styles from "./styles.module.css";
import Tool from "./Tool";
import useUniversalInput from "@/hooks/useUniversalInput";
import ShapeTool from "./ShapeTools";
import { getCssColor } from "@/types/color";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

function Toolbar() {
  const { stopPropagation, stopPropagationAndEdit } = useUniversalInput();
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <div
      onMouseDown={stopPropagation}
      onMouseUp={stopPropagationAndEdit}
      className={styles.toolbar}
      style={
        {
          "--primary": getCssColor(theme.primary),
          "--onPrimary": getCssColor(theme.onPrimary),
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
