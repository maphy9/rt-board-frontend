import ImageObject from "@/types/BoardObjects/imageObject";
import React from "react";
import styles from "./styles.module.css";

function ImageObjectComponent({ imageObject }: { imageObject: ImageObject }) {
  return (
    <div
      style={{
        backgroundImage: `url(${imageObject.src})`,
      }}
      className={styles.imageObject}
    />
  );
}

export default ImageObjectComponent;
