import React from "react";
import styles from "./styles.module.css";
import { SelectedTool } from "@/types/Toolbox";
import { capitalize } from "@/utils/string";
import { useDispatch } from "react-redux";
import { setSelectedTool } from "@/state/slices/toolboxSlice";

function Tool({
  selectedTool,
  iconPath,
}: {
  selectedTool: SelectedTool;
  iconPath: string;
}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedTool(selectedTool));
  };

  return (
    <div
      className={styles.tool}
      onClick={handleClick}
      title={capitalize(selectedTool)}
    >
      <img className={styles.toolIcon} src={iconPath} />
    </div>
  );
}

export default Tool;
