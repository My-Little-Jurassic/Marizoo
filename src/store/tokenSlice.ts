import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface ITokenState {
  token: string | null;
}

const initialState: ITokenState = {
  token: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export const selectToken = (state: RootState) => state.token;
export default tokenSlice.reducer;
