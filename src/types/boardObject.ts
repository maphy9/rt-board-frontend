import Point from "./point";
import Size from "./size";

export type BoardObjectTypes = "text";

export default interface BoardObject {
  id: number;
  position: Point;
  size: Size;
  isEditing: boolean;
  isSelected: boolean;
  type: BoardObjectTypes;
}
