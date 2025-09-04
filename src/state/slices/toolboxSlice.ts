import Toolbox from "@/types/Toolbox";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addBoardObject } from "./boardObjectsSlice";
import { createTextObject } from "@/types/textObject";
import BoardObject from "@/types/boardObject";

const initialState: Toolbox = {
  selectedTool: "cursor",
};

export const toolboxSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    setSelectedTool: (state, action) => {
      state.selectedTool = action.payload;
    },
  },
});

export const { setSelectedTool } = toolboxSlice.actions;
export default toolboxSlice.reducer;
