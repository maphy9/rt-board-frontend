export type SelectedTool = "cursor" | "text" | "note" | "image";

export default interface Toolbox {
  selectedTool: SelectedTool;
}
