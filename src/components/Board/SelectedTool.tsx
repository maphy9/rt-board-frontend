import { RootState } from "@/state/store";
import Input from "@/types/input";
import Toolbox, { SelectedTool } from "@/types/toolbox";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

function SelectedToolComponent() {
  const input: Input = useSelector((state: RootState) => state.input);
  const toolbox: Toolbox = useSelector((state: RootState) => state.toolbox);
  const { selectedTool } = toolbox;

  const position = input.mousePosition;

  return selectedTool === "cursor" ? (
    <></>
  ) : (
    <img
      className={styles.selectedTool}
      style={{
        top: position.y,
        left: position.x,
      }}
      src={`${selectedTool}.svg`}
      draggable="false"
    />
  );
}

export default SelectedToolComponent;