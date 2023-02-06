import { createSlice } from "@reduxjs/toolkit";
import { Connection, OpenVidu, Session, Subscriber } from "openvidu-browser";
import { useAppSelector } from ".";

const isLiked = useAppSelector((state) => state.broadcast.isLiked);

interface IInitialState {
  OV: null | OpenVidu;
  mySessionId: undefined | string;
  myUserName: undefined | string;
  session: undefined | Session;
  subscriber: undefined | Subscriber;
  ownerConnection: undefined | Connection;
}

const initialState: IInitialState = {
  OV: null,
  mySessionId: undefined,
  myUserName: undefined,
  session: undefined,
  subscriber: undefined,
  ownerConnection: undefined,
};

const ovSlice = createSlice({
  name: "ovSlice",
  initialState,
  reducers: {
    createOpenvidu: (state, { payload }) => {
      if (!state.OV) {
        state.myUserName = payload.nickname;
        state.mySessionId = payload.roomId;
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
      state.myUserName = undefined;

      // return payload
    },

    like(state) {
      if (state.session && state.ownerConnection) {
        if (isLiked) {
          state.session.signal({
            data: "",
            to: [state.ownerConnection],
            type: "like",
          });
        } else {
          state.session.signal({
            data: "",
            to: [state.ownerConnection],
            type: "dislike",
          });
        }
      }
    },
  },
});

export const ovActions = ovSlice.actions;
export default ovSlice.reducer;
