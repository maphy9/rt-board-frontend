import { RootState } from "@/state/store";
import Camera from "@/types/camera";
import { toCameraSize } from "@/types/size";
import TextObject from "@/types/TextObject";
import React from "react";
import { useSelector } from "react-redux";

function TextObjectComponent({ textObject }: { textObject: TextObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const size = toCameraSize(textObject.size, camera);
  const fontSize = textObject.fontSize / camera.zoom;
  return (
    <div
      style={{
        width: size.width,
        height: size.height,
        color: textObject.color,
        fontStyle: textObject.fontStyle,
        fontSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {textObject.text}
    </div>
  );
}

export default TextObjectComponent;
