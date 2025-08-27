import { configureStore } from "@reduxjs/toolkit";
import cameraReducer from "@/state/reducers/camera/cameraSlice";
import boardObjectsReducer from "@/state/reducers/boardObjects/boardObjectsSlice";
import inputReducer from "@/state/reducers/input/inputSlice";

export const store = configureStore({
  reducer: {
    camera: cameraReducer,
    boardObjects: boardObjectsReducer,
    input: inputReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
