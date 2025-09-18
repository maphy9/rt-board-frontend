import ImageObject from "@/types/BoardObjects/imageObject";
import React, { useMemo } from "react";
import styles from "./styles.module.css";

function ImageObjectComponent({ imageObject }: { imageObject: ImageObject }) {
  return useMemo(
    () => (
      <div
        style={{
          backgroundImage: `url(${imageObject.src})`,
        }}
        className={styles.imageObject}
      />
    ),
    [imageObject.src]
  );
}

export default ImageObjectComponent;
