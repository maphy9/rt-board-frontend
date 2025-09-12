import useEditEvents from "@/hooks/useEditEvents";
import NoteObject from "@/types/BoardObjects/noteObject";
import React from "react";
import styles from "./styles.module.css";
import TextObjectContent from "../TextObject/TextObjectContent";
import { getCssColor } from "@/types/color";

function NoteObjectComponent({ noteObject }: { noteObject: NoteObject }) {
  const { handleDoubleClick } = useEditEvents(noteObject);
  const backgroundColor = getCssColor(noteObject.backgroundColor);

  return (
    <div
      className={styles.noteObject}
      onDoubleClick={handleDoubleClick}
      style={{
        backgroundColor,
      }}
    >
      <TextObjectContent textObject={noteObject} />
    </div>
  );
}

export default NoteObjectComponent;
