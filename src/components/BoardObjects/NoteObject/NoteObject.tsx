import useEditEvents from "@/hooks/useEditEvents";
import { RootState } from "@/state/store";
import NoteObject from "@/types/BoardObjects/noteObject";
import Camera from "@/types/camera";
import { toCameraSize } from "@/types/size";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import TextObjectContent from "../TextObject/TextObjectContent";
import { getCssColor } from "@/types/BoardObjects/textObject";

function NoteObjectComponent({ noteObject }: { noteObject: NoteObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);

  const size = toCameraSize(noteObject.size, camera);
  const { handleDoubleClick } = useEditEvents(noteObject);
  const backgroundColor = getCssColor(noteObject.backgroundColor);

  return (
    <div
      className={styles.noteObject}
      onDoubleClick={handleDoubleClick}
      style={{
        width: size.width,
        height: size.height,
        backgroundColor,
      }}
    >
      <TextObjectContent textObject={noteObject} />
    </div>
  );
}

export default NoteObjectComponent;
