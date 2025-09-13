import Theme, { darkTheme, lightTheme } from "@/types/theme";
import { useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(darkTheme);

  const changeTheme = (newTheme: "light" | "dark") => {
    if (newTheme === "light") {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  };

  return {
    theme,
    changeTheme,
  };
}
