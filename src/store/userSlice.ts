import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { getRefresh, postLogin } from "../api";
import { ILoginBody } from "../api/user/type";

interface IUserState {
  isUser: boolean;
  token: string | undefined;
  status: "default" | "loading" | "success" | "failed";
}

const initialState: IUserState = {
  isUser: false,
  token: undefined,
  status: "default",
};

export const login = createAsyncThunk("user/login", async (body: ILoginBody) => {
  const res = await postLogin(body);
  return res.headers["access-token"];
});

export const refresh = createAsyncThunk("user/refresh", async () => {
  const res = await getRefresh();
  return res.headers["access-token"];
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "default";
      state.isUser = false;
      state.token = undefined;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserState>) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.token = payload;
      state.isUser = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.status = "failed";
      state.token = undefined;
      state.isUser = false;
    });

    builder.addCase(refresh.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(refresh.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.token = payload;
      state.isUser = true;
    });
    builder.addCase(refresh.rejected, (state) => {
      state.status = "default";
      state.isUser = false;
      state.token = undefined;
    });
  },
});

export const { logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
