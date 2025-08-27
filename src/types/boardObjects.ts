import BoardObject from "./boardObject";

export default interface BoardObjects {
  objects: Record<number, BoardObject>;
  order: number[];
  selected: Record<number, boolean>;
}
