import BoardObjects from "@/types/boardObjects";
import { createTextObject } from "@/types/textObject";
import { createSlice } from "@reduxjs/toolkit";

const initialState: BoardObjects = {
  objects: {},
  order: [],
  selected: {},
};

export const boardObjectsSlice = createSlice({
  name: "boardObjectsSlice",
  initialState,
  reducers: {
    addTextObject: (state, action) => {
      const { position, text } = action.payload;
      const textObject = createTextObject(position, text);
      state.objects[textObject.id] = textObject;
      state.order.push(textObject.id);
    },
    selectObject: (state, action) => {
      const id = action.payload;
      state.selected[id] = true;
      state.objects[id].isSelected = true;
    },
    unselectObject: (state, action) => {
      const id = action.payload;
      delete state.selected[id];
      state.objects[id].isSelected = false;
    },
    clearSelection: (state) => {
      for (const id in state.selected) {
        state.objects[id].isSelected = false;
      }
      state.selected = {};
    },
    moveSelectedObjects: (state, action) => {
      const { dx, dy } = action.payload;
      for (const id in state.selected) {
        state.objects[id].position.x -= dx;
        state.objects[id].position.y -= dy;
      }
    },
  },
});

export const {
  addTextObject,
  selectObject,
  unselectObject,
  clearSelection,
  moveSelectedObjects,
} = boardObjectsSlice.actions;

export default boardObjectsSlice.reducer;
