import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Tool from "./Tool";
import { isShape } from "@/types/BoardObjects/shapeObject";
import { getCssColor } from "@/types/color";

function ShapeTool() {
  const toolbox = useSelector((state: RootState) => state.toolbox);
  const [isOpen, setIsOpen] = useState(false);

  const { theme } = useSelector((state: RootState) => state.theme);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const isSelected = isShape(toolbox.selectedTool);

  useEffect(() => {
    setIsOpen(false);
  }, [toolbox.selectedTool]);

  return (
    <div className={styles.tool} onClick={handleClick} title="Shape">
      <img
        className={styles.toolIcon}
        style={
          {
            backgroundColor: isSelected
              ? getCssColor(theme.surface)
              : getCssColor(theme.secondary),
            maskImage: "url(shape.svg)",
            WebkitMaskImage: "url(shape.svg)",
          } as any
        }
      />

      {isOpen ? (
        <div className={styles.shapeTools}>
          <Tool selectedTool="square" />
          <Tool selectedTool="circle" />
          <Tool selectedTool="arrow" />
          <Tool selectedTool="heart" />
          <Tool selectedTool="star" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ShapeTool;
