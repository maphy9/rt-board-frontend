import TextObject, { getFontStyle } from "@/types/BoardObjects/textObject";
import React from "react";
import TextObjectInput from "./TextObjectInput";
import { RootState } from "@/state/store";
import Camera, { scaleToCamera } from "@/types/camera";
import { useSelector } from "react-redux";
import { getCssColor } from "@/types/color";

function TextObjectContent({ textObject }: { textObject: TextObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);

  const fontSize = scaleToCamera(textObject.fontSize, camera);
  const fontStyle = getFontStyle(textObject.fontStyle);
  const fontColor = getCssColor(textObject.fontColor);

  return (
    <>
      {textObject.isEditing ? (
        <TextObjectInput textObject={textObject} />
      ) : textObject.text !== "" ? (
        <span style={{ ...fontStyle, fontSize, color: fontColor }}>
          {textObject.text}
        </span>
      ) : (
        <span
          style={{
            ...fontStyle,
            color: getCssColor({ ...textObject.fontColor, a: 0.5 }),
            fontSize,
          }}
        >
          Enter text
        </span>
      )}
    </>
  );
}

export default TextObjectContent;
