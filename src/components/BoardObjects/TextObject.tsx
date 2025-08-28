import useEditEvents from "@/hooks/useEditEvents";
import { setText } from "@/state/reducers/boardObjects/boardObjectsSlice";
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

  const handleChange = (event) => {
    const text = event.target.value;
    dispatch(setText({ id: textObject.id, text }));
  };

  const { handleBlur, handleDoubleClick } = useEditEvents(textObject);

  return (
    <div
      onDoubleClick={handleDoubleClick}
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
          onBlur={handleBlur}
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
          onMouseUp={(event) => {
            event.stopPropagation();
          }}
          onMouseMove={(event) => {
            event.stopPropagation();
          }}
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
        />
      ) : (
        <span>{textObject.text}</span>
      )}
    </div>
  );
}

export default TextObjectComponent;
