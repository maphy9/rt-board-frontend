import BoardObject from "./boardObject";
import Point from "./point";

export default interface TextObject extends BoardObject {
  text: string;
  fontSize: number;
  fontStyle: string;
  color: string;
}

export function createTextObject(position: Point, text: string): TextObject {
  return {
    id: Date.now(),
    position,
    size: { width: 100, height: 32 },
    isSelected: false,
    type: "text",
    text,
    fontSize: 16,
    fontStyle: "normal",
    color: "black",
    isEditing: false,
  };
}
