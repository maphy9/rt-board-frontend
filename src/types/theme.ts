import Color, { rgba } from "./color";

export default interface Theme {
  primary: Color;
  onPrimary: Color;
  secondary: Color;
  onSecondary: Color;
  surface: Color;
}

export const lightTheme: Theme = {
  primary: rgba(255, 255, 255),
  onPrimary: rgba(200, 200, 200),
  secondary: rgba(0, 0, 0),
  onSecondary: rgba(40, 40, 40),
  surface: rgba(0, 191, 255),
};

export const darkTheme: Theme = {
  primary: rgba(0, 0, 0),
  onPrimary: rgba(55, 55, 55),
  secondary: rgba(255, 255, 255),
  onSecondary: rgba(220, 220, 220),
  surface: rgba(0, 105, 148),
};
