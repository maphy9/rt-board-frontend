import { Shape } from "./BoardObjects/shapeObject";

export type SelectedTool = "cursor" | "text" | "note" | "image" | Shape;

export default interface Toolbox {
  selectedTool: SelectedTool;
}
