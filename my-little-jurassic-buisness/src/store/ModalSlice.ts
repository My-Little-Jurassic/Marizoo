import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface IModalState {
  visible: boolean;
}

const initialState: IModalState = {
  visible: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.visible = true;
    },
    closeModal: (state) => {
      state.visible = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
