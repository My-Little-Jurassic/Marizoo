import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMaximized: false,
  selectedFeed: null,
  isVoted: false,
  isLiked: false,
  numberOfViewers: 0,
  numberOfLikes: 0,
  isOwner: true,
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

    resetRoom(state) {
      state.isMaximized = false;
      state.selectedFeed = null;
      state.isVoted = false;
      state.isLiked = false;
      state.numberOfViewers = 0;
      state.numberOfLikes = 0;
    },
  },
});

export const broadcastActions = broadcastSlice.actions;
export default broadcastSlice.reducer;
