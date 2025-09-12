import getID from "@/utils/id";
import Point from "../point";
import Size from "../size";
import ImageObject from "./imageObject";

export type Shape = "square" | "circle" | "arrow" | "check" | "star" | "heart";

export function createShapeObject(
  src: Shape,
  position: Point,
  size: Size
): ImageObject {
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
    src,
  };
}

export function isShape(s: string): boolean {
  return ["square", "circle", "arrow", "check", "star", "heart"].includes(s);
}
