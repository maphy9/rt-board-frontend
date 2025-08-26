import BoardObjects from "@/types/BoardObjects";
import { createTextObject } from "@/types/TextObject";
import { createSlice } from "@reduxjs/toolkit";

const initialState: BoardObjects = {
  objects: {},
  order: [],
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
  },
});

export const { addTextObject } = boardObjectsSlice.actions;

export default boardObjectsSlice.reducer;
