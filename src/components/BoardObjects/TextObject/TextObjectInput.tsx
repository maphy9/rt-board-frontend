import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import useEditEvents from "@/hooks/useEditEvents";
import TextObject, { getFontStyle } from "@/types/BoardObjects/textObject";
import useUniversalInput from "@/hooks/useUniversalInput";
import Camera, { scaleToCamera } from "@/types/camera";
import { RootState } from "@/state/store";
import { toCameraSize } from "@/types/size";
import { getCssColor } from "@/types/color";
import { useSelector } from "react-redux";

function TextObjectInput({ textObject }: { textObject: TextObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);

  const { theme } = useSelector((state: RootState) => state.theme);

  const size = toCameraSize(textObject.size, camera);
  const fontSize = scaleToCamera(textObject.fontSize, camera);
  const fontStyle = getFontStyle(textObject.fontStyle);
  const fontColor = getCssColor(textObject.fontColor);

  const { handleBlur } = useEditEvents(textObject);
  const { stopPropagation, stopPropagationAndEdit } = useUniversalInput();

  const [newText, setNewText] = useState(textObject.text);

  useEffect(() => {
    setNewText(textObject.text);
  }, [textObject.text]);

  const handleChange = (event) => {
    const text = event.target.value;
    setNewText(text);
  };

  return (
    <input
      autoFocus
      className={styles.textObjectInput}
      onBlur={() => handleBlur(newText)}
      onMouseDown={stopPropagationAndEdit}
      onMouseUp={stopPropagationAndEdit}
      onMouseMove={stopPropagation}
      style={{
        width: size.width,
        height: size.height,
        color: fontColor,
        fontSize,
        ...fontStyle,
        backgroundColor: getCssColor({ ...theme.secondary, a: 0.5 }),
      }}
      value={newText}
      onChange={handleChange}
    />
  );
}

export default TextObjectInput;
