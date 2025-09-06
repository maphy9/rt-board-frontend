import getID from "@/utils/id";
import BoardObject from "./boardObject";
import Point from "../point";
import Size from "../size";

export default interface ImageObject extends BoardObject {
  src: string;
}

export function createImageObject(
  src: string,
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
    type: "image",
    isEditing: false,
    resizingCorner: null,
    src,
  };
}
