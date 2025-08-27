import Input from "@/types/input";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Input = {
  mousePosition: { x: 0, y: 0 },
  isPanning: false,
  isHoldingMouse: false,
  isDragging: false,
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setMousePosition: (state, action) => {
      state.mousePosition.x = action.payload.x;
      state.mousePosition.y = action.payload.y;
    },
    setIsPanning: (state, action) => {
      state.isPanning = action.payload;
    },
    setIsHoldingMouse: (state, action) => {
      state.isHoldingMouse = action.payload;
    },
    setIsDragging: (state, action) => {
      state.isDragging = action.payload;
    },
  },
});

export const {
  setMousePosition,
  setIsHoldingMouse,
  setIsDragging,
  setIsPanning,
} = inputSlice.actions;
export default inputSlice.reducer;
