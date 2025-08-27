import Point from "./point";

export default interface Input {
  mousePosition: Point;
  isPanning: boolean;
  isHoldingMouse: boolean;
  isDragging: boolean;
}
