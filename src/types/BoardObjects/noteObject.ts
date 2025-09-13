import getID from "@/utils/id";
import Point from "../point";
import TextObject from "./textObject";
import Color from "../color";

export default interface NoteObject extends TextObject {
  backgroundColor: Color;
}

export function createNoteObject(position: Point): NoteObject {
  return {
    id: getID(),
    position,
    minWidth: 100,
    minHeight: 100,
    size: { width: 200, height: 200 },
    isSelected: false,
    type: "note",
    text: "",
    fontSize: 24,
    fontStyle: "normal",
    fontColor: { r: 0, g: 0, b: 0, a: 1 },
    isEditing: false,
    resizingCorner: null,
    rotationAngle: 0,
    rotatingPoint: null,
    backgroundColor: { r: 46, g: 103, b: 248, a: 1 },
    isFlippedHorizontally: false,
    isFlippedVertically: false,
  };
}
