import BoardObject from "./BoardObject";

export default interface BoardObjects {
  objects: Record<number, BoardObject>;
  order: number[];
  selected: Record<number, boolean>;
}
