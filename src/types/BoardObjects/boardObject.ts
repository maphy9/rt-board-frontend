import { getImageSize } from "@/utils/image";
import Point from "../point";
import Size, { scaleSize } from "../size";
import { SelectedTool } from "../toolbox";
import { createImageObject } from "./imageObject";
import NoteObject, { createNoteObject } from "./noteObject";
import TextObject, { createTextObject } from "./textObject";
import ShapeObject, { createShapeObject, isShape, Shape } from "./shapeObject";
import Theme from "../theme";

export type BoardObjectType = "text" | "note" | "image" | "shape";
export type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export default interface BoardObject {
  id: string;
  position: Point;
  size: Size;
  isEditing: boolean;
  isSelected: boolean;
  resizingCorner: Corner | null;
  rotatingPoint: Point | null;
  rotationAngle: number;
  type: BoardObjectType;
  minWidth: number;
  minHeight: number;
  isFlippedHorizontally: boolean;
  isFlippedVertically: boolean;
}

export async function createBoardObject(
  selectedTool: SelectedTool,
  position: Point,
  theme: Theme,
  src?: string
): Promise<BoardObject> {
  let boardObject = null;
  if (selectedTool === "text") {
    boardObject = createTextObject(position);
    (boardObject as TextObject).fontColor = theme.secondary;
  } else if (selectedTool === "note") {
    boardObject = createNoteObject(position);
    (boardObject as NoteObject).backgroundColor = theme.surface;
    (boardObject as NoteObject).fontColor = theme.secondary;
  } else if (selectedTool === "image") {
    const size = await getImageSize(src);
    boardObject = createImageObject(src, position, size);
  } else if (isShape(selectedTool)) {
    const size = scaleSize(await getImageSize(src), 4);
    boardObject = createShapeObject(src, position, size);
    (boardObject as ShapeObject).backgroundColor = theme.secondary;
  }
  boardObject.position.x -= boardObject.size.width / 2;
  boardObject.position.y -= boardObject.size.height / 2;
  return boardObject;
}
