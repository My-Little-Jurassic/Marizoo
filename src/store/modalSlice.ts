import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { DefaultModal } from "../components/common/modal";

interface IModalState {
  visible: boolean;
  content: () => JSX.Element;
}

const initialState: IModalState = {
  visible: true,
  content: DefaultModal,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<() => JSX.Element>) => {
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
