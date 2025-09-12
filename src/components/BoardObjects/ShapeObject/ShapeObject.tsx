import ShapeObject from "@/types/BoardObjects/shapeObject";
import React from "react";
import styles from "./styles.module.css";
import { getCssColor } from "@/types/color";

function ShapeObjectComponent({ shapeObject }: { shapeObject: ShapeObject }) {
  return (
    <div
      style={{
        backgroundColor: getCssColor(shapeObject.backgroundColor),
        WebkitMaskImage: `url(${shapeObject.src})`,
        maskImage: `url(${shapeObject.src})`,
      }}
      className={styles.imageObject}
    />
  );
}

export default ShapeObjectComponent;
