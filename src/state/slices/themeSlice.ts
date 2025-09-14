import Theme, { darkTheme, lightTheme } from "@/types/theme";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Theme = darkTheme;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      const newTheme = action.payload;
      if (newTheme === "light") {
        state = lightTheme;
      } else {
        state = darkTheme;
      }
      localStorage.setItem("theme", newTheme);
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
