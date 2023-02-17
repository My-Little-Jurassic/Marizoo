import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface IModalState {
  visible: boolean;
  content: string;
  data: string;
}

const initialState: IModalState = {
  visible: false,
  content: "DefaultModal",
  data: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setContentData: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
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

export const { setContent, openModal, closeModal, setContentData } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
