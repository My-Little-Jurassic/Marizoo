import { createSlice } from "@reduxjs/toolkit";
import { Connection, Session } from "openvidu-browser";
import { IFeed } from "../components/user/Broadcast/type";

interface IInitialState {
  isMaximized: boolean;
  isLiked: boolean;
  numberOfViewers: number;
  numberOfLikes: number;
  isVoted: boolean;
  isVoting: string;
  winnerFeed: null | undefined | IFeed;
  feedList: null | IFeed[];
  session: null | Session;
  ownerConnection: null | Connection;
}

const initialState: IInitialState = {
  isMaximized: false,
  isLiked: false,
  numberOfViewers: 0,
  numberOfLikes: 0,
  isVoted: false,
  isVoting: "",
  winnerFeed: null,
  feedList: null,
  session: null,
  ownerConnection: null,
};

const broadcastSlice = createSlice({
  name: "broadcastSlice",
  initialState,
  reducers: {
    makeSession(state, { payload }) {
      state.session = payload.initSession();
    },

    connectOwner: (state, { payload }) => {
      state.ownerConnection = payload;
    },

    maximize(state) {
      state.isMaximized = !state.isMaximized;
    },

    vote(state: IInitialState, { payload }) {
      state.isVoted = true;
      if (state.session && state.ownerConnection) {
        state.session.signal({
          data: String(payload),
          to: [state.ownerConnection],
          type: "vote",
        });
      }
    },

    like(state, { payload }) {
      console.log(payload);
      if (state.session && state.ownerConnection) {
        if (!state.isLiked) {
          state.session.signal({
            data: "like",
            to: [state.ownerConnection],
            type: "like",
          });
        } else {
          state.session.signal({
            data: "",
            to: [state.ownerConnection],
            type: "like",
          });
        }
        state.isLiked = !state.isLiked;
      }
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
          return Number(feed.id) === Number(payload);
        });
      }
    },

    showVoteResult(state, { payload }) {
      state.feedList = payload.feedList;
      state.isVoting = "finish";
      if (state.feedList) {
        state.winnerFeed = state.feedList.find((feed) => {
          return Number(feed.id) === Number(payload.winnerFeed);
        });
      }
    },

    resetRoom(state) {
      state.isMaximized = false;
      state.isVoted = false;
      state.isLiked = false;
      state.numberOfViewers = 0;
      state.numberOfLikes = 0;
      if (state.session) {
        state.session.disconnect();
      }
    },
  },
});

export const broadcastActions = broadcastSlice.actions;
export default broadcastSlice.reducer;
