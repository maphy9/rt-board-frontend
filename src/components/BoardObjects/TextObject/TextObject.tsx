import useEditEvents from "@/hooks/useEditEvents";
import { setText } from "@/state/slices/boardObjectsSlice";
import { RootState } from "@/state/store";
import Camera, { scaleToCamera } from "@/types/camera";
import { toCameraSize } from "@/types/size";
import TextObject, { FontColor, FontStyle } from "@/types/textObject";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import useUniversalInput from "@/hooks/useUniversalInput";

function TextObjectComponent({ textObject }: { textObject: TextObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const dispatch = useDispatch();

  const size = toCameraSize(textObject.size, camera);
  const fontSize = scaleToCamera(textObject.fontSize, camera);
  const fontStyle = getFontStyle(textObject.fontStyle);
  const fontColor = getFontColor(textObject.fontColor);

  const handleChange = (event) => {
    const text = event.target.value;
    dispatch(setText({ id: textObject.id, text }));
  };

  const { handleBlur, handleDoubleClick } = useEditEvents(textObject);
  const { stopPropagation } = useUniversalInput();

  return (
    <div
      className={styles.textObject}
      onDoubleClick={handleDoubleClick}
      style={{
        width: size.width,
        height: size.height,
        color: fontColor,
        fontStyle: textObject.fontStyle,
        fontSize,
      }}
    >
      {textObject.isEditing ? (
        <input
          autoFocus
          className={styles.textObjectInput}
          onBlur={handleBlur}
          onMouseDown={stopPropagation}
          onMouseUp={stopPropagation}
          onMouseMove={stopPropagation}
          style={{
            width: size.width,
            height: size.height,
            color: fontColor,
            fontSize,
            ...fontStyle,
          }}
          value={textObject.text}
          onChange={handleChange}
        />
      ) : textObject.text !== "" ? (
        <span style={fontStyle}>{textObject.text}</span>
      ) : (
        <span style={{ ...fontStyle, color: "gray" }}>Enter text</span>
      )}
    </div>
  );
}

export default TextObjectComponent;

const getFontStyle = (fontStyle: FontStyle) => {
  const textStyle = {
    fontWeight: "normal",
    textDecoration: "none",
    fontStyle: "normal",
  };
  if (fontStyle === "bold") {
    textStyle.fontWeight = "bold";
  } else if (fontStyle === "italic") {
    textStyle.fontStyle = "italic";
  } else if (fontStyle === "line-through") {
    textStyle.textDecoration = "line-through";
  } else if (fontStyle === "underline") {
    textStyle.textDecoration = "underline";
  }
  return textStyle;
};

const getFontColor = (fontColor: FontColor) => {
  const { r, g, b, a } = fontColor;
  return `rgba(${r},${g},${b},${a})`;
};
