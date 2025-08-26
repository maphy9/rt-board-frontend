import BoardObject from "./BoardObject";

export default interface BoardObjects {
  objects: Record<number, BoardObject<any>>;
  order: number[];
}
