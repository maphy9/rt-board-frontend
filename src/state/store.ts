import { configureStore } from "@reduxjs/toolkit";
import cameraReducer from "@/state/slices/cameraSlice";
import boardObjectsReducer from "@/state/slices/boardObjectsSlice";
import inputReducer from "@/state/slices/inputSlice";
import toolboxReducer from "@/state/slices/toolboxSlice";
import themeReducer from "@/state/slices/themeSlice";

export const store = configureStore({
  reducer: {
    camera: cameraReducer,
    boardObjects: boardObjectsReducer,
    input: inputReducer,
    toolbox: toolboxReducer,
    theme: themeReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
