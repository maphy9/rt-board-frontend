import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Tool from "./Tool";
import { isShape, Shape } from "@/types/BoardObjects/shapeObject";

function ShapeTool() {
  const toolbox = useSelector((state: RootState) => state.toolbox);
  const [isOpen, setIsOpen] = useState(false);

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
            maskImage: "url(shape.svg)",
            WebkitMaskImage: "url(shape.svg)",
            backgroundColor: isSelected ? "rgb(46, 103, 248)" : "black",
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
