import TextObject, { getFontStyle } from "@/types/BoardObjects/textObject";
import React, { useMemo } from "react";
import TextObjectInput from "./TextObjectInput";
import { RootState } from "@/state/store";
import Camera, { scaleToCamera } from "@/types/camera";
import { useSelector } from "react-redux";
import { getCssColor } from "@/types/color";

function TextObjectContent({ id }: { id: string }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const boardObjects = useSelector((state: RootState) => state.boardObjects);
  const textObject = boardObjects.objects[id];

  const fontSize = scaleToCamera(textObject.fontSize, camera);
  const fontStyle = getFontStyle(textObject.fontStyle);
  const fontColor = getCssColor(textObject.fontColor);

  return useMemo(
    () => (
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
    ),
    [textObject.isEditing, textObject.text, fontStyle, fontSize, fontColor]
  );
}

export default TextObjectContent;
