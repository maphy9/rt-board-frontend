import {
  setIsEditing,
  setText,
} from "@/state/reducers/boardObjects/boardObjectsSlice";
import { RootState } from "@/state/store";
import Camera from "@/types/camera";
import { toCameraSize } from "@/types/size";
import TextObject from "@/types/textObject";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function TextObjectComponent({ textObject }: { textObject: TextObject }) {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const dispatch = useDispatch();

  const size = toCameraSize(textObject.size, camera);
  const fontSize = textObject.fontSize / camera.zoom;

  const handleDoubleClick = (event) => {
    dispatch(setIsEditing({ id: textObject.id, isEditing: true }));
  };

  const handleChange = (event) => {
    const text = event.target.value;
    dispatch(setText({ id: textObject.id, text }));
  };

  const handleBlur = (event) => {
    dispatch(setIsEditing({ id: textObject.id, isEditing: false }));
  };

  return (
    <div
      onDoubleClick={textObject.isSelected ? handleDoubleClick : () => {}}
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
      {textObject.isEditing ? (
        <input
          style={{
            width: size.width,
            height: size.height,
            color: textObject.color,
            fontStyle: textObject.fontStyle,
            fontSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
          value={textObject.text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <span>{textObject.text}</span>
      )}
    </div>
  );
}

export default TextObjectComponent;
