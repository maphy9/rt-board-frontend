import BoardObject from "./boardObject";

export default interface BoardObjects {
  objects: Record<number, BoardObject>;
  order: string[];
  selected: Record<string, boolean>;
  resized: BoardObject | null;
  rotated: BoardObject | null;
  oldObjectState: BoardObject | null;
}
