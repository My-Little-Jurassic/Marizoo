import { createSlice } from "@reduxjs/toolkit";
import { Connection, OpenVidu, Session, Subscriber } from "openvidu-browser";

interface IInitialState {
  OV: null | OpenVidu;
  mySessionId: undefined | string;
  myUserName: undefined | string;
  session: undefined | Session;
  subscriber: undefined | Subscriber;
  ownerConnection: undefined | Connection;
  params: undefined | number;
}

const initialState: IInitialState = {
  OV: null,
  mySessionId: undefined,
  myUserName: undefined,
  session: undefined,
  subscriber: undefined,
  ownerConnection: undefined,
  params: undefined,
};

const ovSlice = createSlice({
  name: "ovSlice",
  initialState,
  reducers: {
    createOpenvidu: (state, { payload }) => {
      if (state.OV && state.params !== payload.roomId) {
        state.session?.disconnect();
        state.OV = null;
        state.session = undefined;
        state.subscriber = undefined;
        state.mySessionId = undefined;
        state.myUserName = undefined;
        state.ownerConnection = undefined;
      }

      if (!state.OV) {
        state.myUserName = payload.nickname;
        state.mySessionId = payload.roomId;
        state.params = payload.roomId;
        state.OV = new OpenVidu();
        state.session = state.OV.initSession();
      }
    },

    subscribeVideo: (state, { payload }) => {
      const subscriber = state.session?.subscribe(payload, undefined);
      state.subscriber = subscriber;
    },

    connectOwner: (state, { payload }) => {
      state.ownerConnection = payload;
    },

    leaveSession(state) {
      if (state.session) {
        state.session.disconnect();
      }

      state.OV = null;
      state.session = undefined;
      state.subscriber = undefined;
      state.mySessionId = undefined;
      state.params = undefined;
      state.myUserName = undefined;
      state.ownerConnection = undefined;
    },

    like(state, { payload }) {
      console.log("좋ㅇ요좋ㅇ요좋ㅇ요좋ㅇ요좋ㅇ요좋ㅇ요좋ㅇ요좋ㅇ요좋ㅇ요");
      if (state.session && state.ownerConnection) {
        if (!payload) {
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
      }
    },

    vote(state, { payload }) {
      if (state.session && state.ownerConnection) {
        state.session.signal({
          data: payload,
          to: [state.ownerConnection],
          type: "vote",
        });
      }
    },
  },
});

export const ovActions = ovSlice.actions;
export default ovSlice.reducer;
