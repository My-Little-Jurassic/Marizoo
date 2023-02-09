import { createSlice } from "@reduxjs/toolkit";
import { IFeed } from "../components/broadcast/type";

interface IInitialState {
  isMaximized: boolean;
  selectedFeed: null | string;
  isLiked: boolean;
  numberOfViewers: number;
  numberOfLikes: number;
  effectCnt: number;
  isVoted: boolean;
  isVoting: string;
  winnerFeed: null | undefined | IFeed;
  feedList: null | IFeed[];
}

const initialState: IInitialState = {
  isMaximized: false,
  selectedFeed: null,
  isLiked: false,
  numberOfViewers: 0,
  numberOfLikes: 0,
  effectCnt: 0,
  isVoted: false,
  isVoting: "",
  winnerFeed: null,
  feedList: null,
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

    changeRoomInfo(state, { payload }) {
      state.numberOfLikes = payload.numberOfLikes;
      state.numberOfViewers = payload.numberOfViewers;
    },

    startVote(state, { payload }) {
      state.feedList = payload;
      state.isVoting = "proceeding";
    },

    finishVote(state, { payload }) {
      state.isVoting = "finish";
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
