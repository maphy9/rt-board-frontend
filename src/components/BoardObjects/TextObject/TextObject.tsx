import useEditEvents from "@/hooks/useEditEvents";
import { setText } from "@/state/slices/boardObjectsSlice";
import { RootState } from "@/state/store";
import Camera, { scaleToCamera } from "@/types/camera";
import { toCameraSize } from "@/types/size";
import TextObject from "@/types/textObject";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

function TextObjectComponent({ textObject }: { textObject: TextObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const dispatch = useDispatch();

  const size = toCameraSize(textObject.size, camera);
  const fontSize = scaleToCamera(textObject.fontSize, camera);

  const textStyle = {
    fontWeight: "normal",
    textDecoration: "none",
    fontStyle: "normal",
  };
  if (textObject.fontStyle === "bold") {
    textStyle.fontWeight = "bold";
  } else if (textObject.fontStyle === "italic") {
    textStyle.fontStyle = "italic";
  } else if (textObject.fontStyle === "line-through") {
    textStyle.textDecoration = "line-through";
  } else if (textObject.fontStyle === "underline") {
    textStyle.textDecoration = "underline";
  }

  const handleChange = (event) => {
    const text = event.target.value;
    dispatch(setText({ id: textObject.id, text }));
  };

  const handleMouse = (event) => {
    event.stopPropagation();
  };

  const { handleBlur, handleDoubleClick } = useEditEvents(textObject);

  return (
    <div
      className={styles.textObject}
      onDoubleClick={handleDoubleClick}
      style={{
        width: size.width,
        height: size.height,
        color: textObject.color,
        fontStyle: textObject.fontStyle,
        fontSize,
      }}
    >
      {textObject.isEditing ? (
        <input
          autoFocus
          className={styles.textObjectInput}
          onBlur={handleBlur}
          onMouseDown={handleMouse}
          onMouseUp={handleMouse}
          onMouseMove={handleMouse}
          style={{
            width: size.width,
            height: size.height,
            color: textObject.color,
            fontSize,
            ...textStyle,
          }}
          value={textObject.text}
          onChange={handleChange}
        />
      ) : textObject.text !== "" ? (
        <span style={textStyle}>{textObject.text}</span>
      ) : (
        <span style={{ ...textStyle, color: "gray" }}>Enter text</span>
      )}
    </div>
  );
}

export default TextObjectComponent;
