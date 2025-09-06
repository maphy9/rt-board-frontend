import Point from "../point";
import Size from "../size";

export type BoardObjectType = "text" | "note" | "image";
export type ResizingCorner =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export default interface BoardObject {
  id: string;
  position: Point;
  size: Size;
  isEditing: boolean;
  isSelected: boolean;
  resizingCorner: ResizingCorner | null;
  type: BoardObjectType;
  minWidth: number;
  minHeight: number;
}
