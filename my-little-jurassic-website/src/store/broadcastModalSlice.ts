import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface IModalState {
  visible: boolean;
}

const initialState: IModalState = {
  visible: false,
};

const broadcastModalSlice = createSlice({
  name: "broadcastModal",
  initialState,
  reducers: {
    openBroadcastModal: (state) => {
      state.visible = true;
    },
    closeBroadcastModal: (state) => {
      state.visible = false;
    },
  },
});

export const { openBroadcastModal, closeBroadcastModal } = broadcastModalSlice.actions;
export const selectBroadcastModal = (state: RootState) => state.broadcastModal;
export default broadcastModalSlice.reducer;
