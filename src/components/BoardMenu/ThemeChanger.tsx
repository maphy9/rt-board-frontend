import { RootState } from "@/state/store";
import { getCssColor } from "@/types/color";
import { lightTheme } from "@/types/theme";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { setTheme } from "@/state/slices/themeSlice";

function ThemeChanger() {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const isLight = theme === lightTheme;

  const handleClick = () => {
    if (isLight) {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  };

  return (
    <div
      onClick={handleClick}
      className={styles.themeChanger}
      style={
        {
          "--secondary": getCssColor(theme.secondary),
          "--onPrimary": getCssColor(theme.onPrimary),
          "--secondaryShadow": getCssColor({ ...theme.secondary, a: 0.15 }),
        } as any
      }
    >
      <span>Change theme</span>
      <img
        className={styles.boardMenuOptionIcon}
        style={
          {
            WebkitMaskImage: `url(${isLight ? "lightTheme" : "darkTheme"}.svg)`,
            maskImage: `url(${isLight ? "lightTheme" : "darkTheme"}.svg)`,
          } as any
        }
      />
    </div>
  );
}

export default ThemeChanger;
