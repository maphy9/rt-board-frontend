import { createSlice } from "@reduxjs/toolkit";
import Camera from "@/types/camera";

const initialState: Camera = {
  offsetX: 0,
  offsetY: 0,
  zoom: 1,
};

export const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    zoomCamera: (state, action) => {
      state.zoom = action.payload.zoom;
      state.offsetX += action.payload.dx;
      state.offsetY += action.payload.dy;
    },
    panCamera: (state, action) => {
      state.offsetX += action.payload.dx;
      state.offsetY += action.payload.dy;
    },
  },
});

export const { zoomCamera, panCamera } = cameraSlice.actions;
export default cameraSlice.reducer;
