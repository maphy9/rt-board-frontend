import { darkTheme, lightTheme } from "@/types/theme";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: lightTheme,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const newTheme = action.payload;
      if (newTheme === "light") {
        state.theme = lightTheme;
      } else {
        state.theme = darkTheme;
      }
      localStorage.setItem("theme", newTheme);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
