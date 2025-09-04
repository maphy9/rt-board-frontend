import Toolbox from "@/types/toolbox";
import { createSlice } from "@reduxjs/toolkit";

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
