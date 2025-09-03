import BoardObject from "./boardObject";
import Point from "./point";

export type FontStyle =
  | "normal"
  | "bold"
  | "italic"
  | "line-through"
  | "underline";

export default interface TextObject extends BoardObject {
  text: string;
  fontSize: number;
  fontStyle: FontStyle;
  color: string;
}

export function createTextObject(position: Point): TextObject {
  return {
    id: Date.now(),
    position,
    minWidth: 50,
    minHeight: 32,
    size: { width: 100, height: 32 },
    isSelected: false,
    type: "text",
    text: "",
    fontSize: 16,
    fontStyle: "normal",
    color: "black",
    isEditing: false,
    resizingCorner: null,
  };
}
