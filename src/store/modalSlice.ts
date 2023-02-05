import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface IModalState {
  visible: boolean;
  content: string;
}

const initialState: IModalState = {
  visible: true,
  content: "DefaultModal",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    openModal: (state) => {
      state.visible = true;
    },
    closeModal: (state) => {
      state.visible = false;
    },
  },
});

export const { setContent, openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
