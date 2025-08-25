import { createSlice } from "@reduxjs/toolkit";
import CameraState from "./cameraState";
import { MAX_ZOOM, MIN_ZOOM } from "./constants";

const initialState: CameraState = {
  x: 0,
  y: 0,
  zoom: 1,
};

export const cameraSlice = createSlice({
  name: "camera",
  initialState: initialState,
  reducers: {
    zoomCamera: (state, action) => {
      state.zoom *= action.payload;
      state.zoom = Math.max(state.zoom, MIN_ZOOM);
      state.zoom = Math.min(state.zoom, MAX_ZOOM);
    },
    moveCamera: (state, action) => {
      state.x += action.payload.dx;
      state.y += action.payload.dy;
    },
  },
});

export const { zoomCamera, moveCamera } = cameraSlice.actions;
export default cameraSlice.reducer;
