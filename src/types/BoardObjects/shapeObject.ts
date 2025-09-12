import getID from "@/utils/id";
import Point from "../point";
import Size from "../size";
import ImageObject from "./imageObject";
import Color from "../color";

export type Shape = "square" | "circle" | "arrow" | "check" | "star" | "heart";

export default interface ShapeObject extends ImageObject {
  backgroundColor: Color;
}

export function createShapeObject(
  src: string,
  position: Point,
  size: Size
): ShapeObject {
  return {
    id: getID(),
    position,
    minWidth: 1,
    minHeight: 1,
    size,
    isSelected: false,
    type: "shape",
    isEditing: false,
    resizingCorner: null,
    rotatingCorner: null,
    src,
    backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
  };
}

export function isShape(s: string): boolean {
  return ["square", "circle", "arrow", "check", "star", "heart"].includes(s);
}
