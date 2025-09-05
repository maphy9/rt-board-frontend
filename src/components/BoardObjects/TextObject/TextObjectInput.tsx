import React from "react";
import styles from "./styles.module.css";
import useEditEvents from "@/hooks/useEditEvents";
import TextObject, {
  getCssColor,
  getFontStyle,
} from "@/types/BoardObjects/textObject";
import useUniversalInput from "@/hooks/useUniversalInput";
import Camera, { scaleToCamera } from "@/types/camera";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { toCameraSize } from "@/types/size";
import { setText } from "@/state/slices/boardObjectsSlice";

function TextObjectInput({ textObject }: { textObject: TextObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const dispatch = useDispatch();

  const size = toCameraSize(textObject.size, camera);
  const fontSize = scaleToCamera(textObject.fontSize, camera);
  const fontStyle = getFontStyle(textObject.fontStyle);
  const fontColor = getCssColor(textObject.fontColor);

  const { handleBlur } = useEditEvents(textObject);
  const { stopPropagation } = useUniversalInput();

  const handleChange = (event) => {
    const text = event.target.value;
    dispatch(setText({ id: textObject.id, text }));
  };

  return (
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
  );
}

export default TextObjectInput;
