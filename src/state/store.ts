import { configureStore } from "@reduxjs/toolkit";
import cameraReducer from "@/state/reducers/camera/cameraSlice";

export const store = configureStore({
  reducer: {
    camera: cameraReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
