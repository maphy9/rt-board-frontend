import { getImageSize } from "@/utils/image";
import Point from "../point";
import Size, { scaleSize } from "../size";
import { SelectedTool } from "../toolbox";
import { createImageObject } from "./imageObject";
import { createNoteObject } from "./noteObject";
import { createTextObject } from "./textObject";
import { createShapeObject, isShape, Shape } from "./shapeObject";

export type BoardObjectType = "text" | "note" | "image" | "shape";
export type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export default interface BoardObject {
  id: string;
  position: Point;
  size: Size;
  isEditing: boolean;
  isSelected: boolean;
  resizingCorner: Corner | null;
  rotatingCorner: Corner | null;
  type: BoardObjectType;
  minWidth: number;
  minHeight: number;
}

export async function createBoardObject(
  selectedTool: SelectedTool,
  position: Point,
  src?: string
): Promise<BoardObject> {
  let boardObject = null;
  if (selectedTool === "text") {
    boardObject = createTextObject(position);
  } else if (selectedTool === "note") {
    boardObject = createNoteObject(position);
  } else if (selectedTool === "image") {
    const size = await getImageSize(src);
    boardObject = createImageObject(src, position, size);
  } else if (isShape(selectedTool)) {
    const size = scaleSize(await getImageSize(src), 4);
    boardObject = createShapeObject(src, position, size);
  }
  boardObject.position.x -= boardObject.size.width / 2;
  boardObject.position.y -= boardObject.size.height / 2;
  return boardObject;
}
