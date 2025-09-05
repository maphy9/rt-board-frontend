import getID from "@/utils/id";
import Point from "../point";
import BoardObject from "./boardObject";

export type FontStyle =
  | "normal"
  | "bold"
  | "italic"
  | "line-through"
  | "underline";

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export default interface TextObject extends BoardObject {
  text: string;
  fontSize: number;
  fontStyle: FontStyle;
  fontColor: Color;
}

export function createTextObject(position: Point): TextObject {
  return {
    id: getID(),
    position,
    minWidth: 50,
    minHeight: 32,
    size: { width: 100, height: 32 },
    isSelected: false,
    type: "text",
    text: "",
    fontSize: 16,
    fontStyle: "normal",
    fontColor: { r: 0, g: 0, b: 0, a: 1 },
    isEditing: false,
    resizingCorner: null,
  };
}

export const getFontStyle = (fontStyle: FontStyle) => {
  const textStyle = {
    fontWeight: "normal",
    textDecoration: "none",
    fontStyle: "normal",
  };
  if (fontStyle === "bold") {
    textStyle.fontWeight = "bold";
  } else if (fontStyle === "italic") {
    textStyle.fontStyle = "italic";
  } else if (fontStyle === "line-through") {
    textStyle.textDecoration = "line-through";
  } else if (fontStyle === "underline") {
    textStyle.textDecoration = "underline";
  }
  return textStyle;
};

export const getCssColor = (fontColor: Color) => {
  const { r, g, b, a } = fontColor;
  return `rgba(${r},${g},${b},${a})`;
};
