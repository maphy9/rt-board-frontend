import { RootState } from "@/state/store";
import Input from "@/types/input";
import Toolbox, { SelectedTool } from "@/types/toolbox";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { getCssColor } from "@/types/color";
import useTheme from "@/hooks/useTheme";

function SelectedToolComponent() {
  const input: Input = useSelector((state: RootState) => state.input);
  const toolbox: Toolbox = useSelector((state: RootState) => state.toolbox);
  const { selectedTool } = toolbox;

  const { theme } = useTheme();

  const position = input.mousePosition;

  return selectedTool === "cursor" ? (
    <></>
  ) : (
    <img
      className={styles.selectedTool}
      style={{
        top: position.y,
        left: position.x,
        backgroundColor: getCssColor(theme.secondary),
        WebkitMaskImage: `url(${selectedTool}.svg)`,
        maskImage: `url(${selectedTool}.svg)`,
      }}
      draggable="false"
    />
  );
}

export default SelectedToolComponent;
