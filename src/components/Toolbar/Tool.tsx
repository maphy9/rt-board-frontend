import React from "react";
import styles from "./styles.module.css";
import { SelectedTool } from "@/types/toolbox";
import { capitalize } from "@/utils/string";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTool } from "@/state/slices/toolboxSlice";
import { RootState } from "@/state/store";

function Tool({
  selectedTool,
  iconPath,
}: {
  selectedTool: SelectedTool;
  iconPath: string;
}) {
  const toolbox = useSelector((state: RootState) => state.toolbox);
  const { selectedTool: selectedToolGlobal } = toolbox;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedTool(selectedTool));
  };

  const isSelected = selectedToolGlobal === selectedTool;

  return (
    <div
      className={styles.tool}
      onClick={handleClick}
      title={capitalize(selectedTool)}
    >
      <img
        className={styles.toolIcon}
        style={
          {
            backgroundColor: isSelected ? "rgb(46, 103, 248)" : "black",
            "-webkit-mask-image": `url(${iconPath})`,
            "mask-image": `url(${iconPath})`,
          } as any
        }
      />
    </div>
  );
}

export default Tool;
