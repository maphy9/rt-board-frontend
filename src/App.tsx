import React, { useEffect, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { setTheme } from "./state/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import { lightTheme } from "./types/theme";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    dispatch(setTheme(savedTheme));
  }, []);

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']") as any;
    if (theme.theme === lightTheme) {
      link.href = "icon-light.png";
    } else {
      link.href = "icon-dark.png";
    }
  }, [theme]);

  return <Outlet />;
}

export default App;
