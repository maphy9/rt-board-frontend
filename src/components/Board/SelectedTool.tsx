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

  const selectedToolIcon = getSelectedToolIcon(selectedTool);
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
      src={selectedToolIcon}
      draggable="false"
    />
  );
}

export default SelectedToolComponent;

function getSelectedToolIcon(selectedTool: SelectedTool) {
  let selectedToolIcon = "";
  switch (selectedTool) {
    case "text":
      selectedToolIcon = "text.svg";
      break;
    case "note":
      selectedToolIcon = "note.svg";
      break;
    case "image":
      selectedToolIcon = "image.svg";
      break;
  }
  return selectedToolIcon;
}
