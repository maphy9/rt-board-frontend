import { RootState } from "@/state/store";
import Input from "@/types/input";
import Toolbox from "@/types/Toolbox";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

function SelectedToolComponent() {
  const input: Input = useSelector((state: RootState) => state.input);
  const toolbox: Toolbox = useSelector((state: RootState) => state.toolbox);
  const { selectedTool } = toolbox;

  let selectedToolIcon = "";
  switch (selectedTool) {
    case "text":
      selectedToolIcon = "text.svg";
      break;
    case "cursor":
      return <></>;
  }

  const position = input.mousePosition;

  return (
    <img
      className={styles.selectedTool}
      style={{
        top: position.y,
        left: position.x,
      }}
      src={selectedToolIcon}
      draggable="false"
    />
  );
}

export default SelectedToolComponent;
