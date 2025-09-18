import useEditEvents from "@/hooks/useEditEvents";
import React from "react";
import styles from "./styles.module.css";
import TextObject from "@/types/BoardObjects/textObject";
import TextObjectContent from "./TextObjectContent";

function TextObjectComponent({ textObject }: { textObject: TextObject }) {
  const { handleDoubleClick } = useEditEvents(textObject);

  return (
    <div className={styles.textObject} onDoubleClick={handleDoubleClick}>
      <TextObjectContent id={textObject.id} />
    </div>
  );
}

export default TextObjectComponent;
