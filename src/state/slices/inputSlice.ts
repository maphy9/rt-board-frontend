import Input from "@/types/input";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Input = {
  mousePosition: { x: 0, y: 0 },
  isPanning: false,
  isDragging: false,
  isSelecting: false,
  selectionStart: { x: 0, y: 0 },
  pressed: null,
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
    setIsDragging: (state, action) => {
      state.isDragging = action.payload;
    },
    setIsSelecting: (state, action) => {
      state.isSelecting = action.payload;
    },
    setSelectionStart: (state, action) => {
      const { x, y } = action.payload;
      state.selectionStart = { x, y };
    },
    setPressed: (state, action) => {
      state.pressed = action.payload;
    },
  },
});

export const {
  setMousePosition,
  setIsDragging,
  setIsPanning,
  setIsSelecting,
  setSelectionStart,
  setPressed,
} = inputSlice.actions;
export default inputSlice.reducer;
