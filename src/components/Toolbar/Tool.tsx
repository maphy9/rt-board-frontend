import React from "react";
import styles from "./styles.module.css";
import { SelectedTool } from "@/types/toolbox";
import { capitalize } from "@/utils/string";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTool } from "@/state/slices/toolboxSlice";
import { RootState } from "@/state/store";
import { clearSelection } from "@/state/slices/boardObjectsSlice";
import { getCssColor } from "@/types/color";
import Theme from "@/types/theme";

function Tool({ selectedTool }: { selectedTool: SelectedTool }) {
  const toolbox = useSelector((state: RootState) => state.toolbox);
  const { selectedTool: selectedToolGlobal } = toolbox;
  const dispatch = useDispatch();

  const theme: Theme = useSelector((state: RootState) => state.theme);

  const handleClick = () => {
    dispatch(clearSelection());
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
            backgroundColor: isSelected
              ? getCssColor(theme.surface)
              : getCssColor(theme.secondary),
            WebkitMaskImage: `url(${selectedTool}.svg)`,
            maskImage: `url(${selectedTool}.svg)`,
          } as any
        }
      />
    </div>
  );
}

export default Tool;
