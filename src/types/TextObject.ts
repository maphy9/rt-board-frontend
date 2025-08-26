import BoardObject from "./BoardObject";
import Point from "./point";

export default interface TextObject extends BoardObject {
  text: string;
  fontSize: number;
  fontStyle: string;
  color: string;
}

export function createTextObject(position: Point, text: string): TextObject {
  const id = Date.now();
  const size = { width: 100, height: 32 };
  const isSelected = false;
  const fontSize = 16;
  const fontStyle = "normal";
  const color = "black";
  const textObject: TextObject = {
    id,
    position,
    size,
    isSelected,
    type: "text",
    text,
    fontSize,
    fontStyle,
    color,
  };
  return textObject;
}
