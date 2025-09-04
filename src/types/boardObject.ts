import Point from "./point";
import Size from "./size";

export type BoardObjectTypes = "text";
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
  type: BoardObjectTypes;
  minWidth: number;
  minHeight: number;
}
