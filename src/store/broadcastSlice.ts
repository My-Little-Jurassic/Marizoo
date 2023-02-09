import { createSlice } from "@reduxjs/toolkit";
import { IFeed } from "../components/broadcast/type";

interface IInitialState {
  isMaximized: boolean;
  selectedFeed: null | string;
  isVoted: boolean;
  isLiked: boolean;
  numberOfViewers: number;
  numberOfLikes: number;
  isVoting: boolean;
  winnerFeed: null | undefined | IFeed;
  feedList: null | IFeed[];
  isOwner: boolean;
  tmpId: number;
}

const initialState: IInitialState = {
  isMaximized: false,
  selectedFeed: null,
  isVoted: false,
  isLiked: false,
  numberOfViewers: 0,
  numberOfLikes: 0,
  isVoting: false,
  winnerFeed: null,
  feedList: null,
  isOwner: false,
  tmpId: 0,
};

const broadcastSlice = createSlice({
  name: "broadcastSlice",
  initialState,
  reducers: {
    changeId(state) {
      state.tmpId = state.tmpId + 1;
    },

    change(state) {
      state.isOwner = !state.isOwner;
    },

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

    startVote(state, { payload }) {
      state.feedList = payload;
      state.isVoting = true;
    },

    finishVote(state, { payload }) {
      state.isVoting = false;
      if (state.feedList) {
        state.winnerFeed = state.feedList.find((feed) => {
          return feed.id === payload;
        });
      }
    },

    pickFeed(state, { payload }) {
      if (state.selectedFeed === payload) {
        state.selectedFeed = null;
      } else {
        state.selectedFeed = payload;
      }
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
