import { configureStore } from "@reduxjs/toolkit";
import cameraReducer from "@/state/slices/cameraSlice";
import boardObjectsReducer from "@/state/slices/boardObjectsSlice";
import inputReducer from "@/state/slices/inputSlice";
import toolboxReducer from "@/state/slices/toolboxSlice";
import themeReducer from "@/state/slices/themeSlice";
import historyReducer from "@/state/slices/historySlice";

export const store = configureStore({
  reducer: {
    camera: cameraReducer,
    boardObjects: boardObjectsReducer,
    input: inputReducer,
    toolbox: toolboxReducer,
    theme: themeReducer,
    history: historyReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
