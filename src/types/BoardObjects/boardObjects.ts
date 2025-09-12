import BoardObject from "./boardObject";

export default interface BoardObjects {
  objects: Record<number, BoardObject>;
  order: string[];
  selected: Record<string, boolean>;
  resized: string | null;
  rotated: string | null;
}
