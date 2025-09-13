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

export const rgba = (r: number, g: number, b: number, a = 1): Color => ({
  r,
  g,
  b,
  a,
});
