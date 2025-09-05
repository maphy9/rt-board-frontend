import useEditEvents from "@/hooks/useEditEvents";
import { RootState } from "@/state/store";
import Camera from "@/types/camera";
import { toCameraSize } from "@/types/size";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import TextObject from "@/types/BoardObjects/textObject";
import TextObjectContent from "./TextObjectContent";

function TextObjectComponent({ textObject }: { textObject: TextObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);

  const size = toCameraSize(textObject.size, camera);
  const { handleDoubleClick } = useEditEvents(textObject);

  return (
    <div
      className={styles.textObject}
      onDoubleClick={handleDoubleClick}
      style={{
        width: size.width,
        height: size.height,
      }}
    >
      <TextObjectContent textObject={textObject} />
    </div>
  );
}

export default TextObjectComponent;
