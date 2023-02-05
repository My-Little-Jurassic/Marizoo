import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface ITokenState {
  value: string | null;
}

const initialState: ITokenState = {
  value: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export const selectToken = (state: RootState) => state.token.value;
export default tokenSlice.reducer;
