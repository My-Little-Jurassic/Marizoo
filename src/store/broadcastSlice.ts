import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isMaximized: false,
  selectedFeed: null,
  isVoted: false,
  isLiked: false,
  numberOfViewers: 0,
  numberOfLikes: 0,
};

const broadcastSlice = createSlice({
  name: "broadcastSlice",
  initialState,
  reducers: {
    maximize(state) {
      state.isMaximized = !state.isMaximized;
    },

    vote(state, { payload }) {
      state.selectedFeed = payload;
      state.isVoted = !state.isVoted;
    },

    toggleLike(state) {
      state.isLiked = !state.isLiked;
    },

    changeNumberOfLikes(state, { payload }) {
      state.numberOfLikes = payload;
    },

    changeNumberOfViewers(state, { payload }) {
      state.numberOfViewers = payload;
    },
  },
});

export const broadcastActions = broadcastSlice.actions;
export default broadcastSlice.reducer;
