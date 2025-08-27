import Point from "./point";

export default interface Input {
  mousePosition: Point;
  isPanning: boolean;
  isDragging: boolean;
  isSelecting: boolean;
  selectionStart: Point;
}
