import History, { MAX_HISTORY_LENGTH } from "@/types/history";
import { createSlice } from "@reduxjs/toolkit";

const initialState: History = {
  history: [],
  historyIndex: 0,
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistoryItem: (state, action) => {
      state.history = state.history.slice(0, state.historyIndex);
      if (state.history.length === MAX_HISTORY_LENGTH) {
        state.history = state.history.slice(1);
      }
      state.history.push(action.payload);
      state.historyIndex++;
    },
    goToFuture: (state) => {
      state.historyIndex = Math.min(
        state.historyIndex + 1,
        state.history.length
      );
    },
    goToPast: (state) => {
      state.historyIndex = Math.max(state.historyIndex - 1, 0);
    },
  },
});

export const { addHistoryItem, goToFuture, goToPast } = historySlice.actions;
export default historySlice.reducer;
