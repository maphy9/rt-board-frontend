export default interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export const getCssColor = (fontColor: Color) => {
  const { r, g, b, a } = fontColor;
  return `rgba(${r},${g},${b},${a})`;
};
