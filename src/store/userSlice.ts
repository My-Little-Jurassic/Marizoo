import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { getRefresh, postLogin } from "../api";
import { ILoginBody } from "../api/user/type";

interface IUserState {
  isUser: boolean;
  pk: string | undefined;
  uid: string | undefined;
  nickname: string | undefined;
  token: string | undefined;
  status: "default" | "loading" | "success" | "failed";
}

const initialState: IUserState = {
  isUser: false,
  pk: undefined,
  uid: undefined,
  nickname: undefined,
  token: undefined,
  status: "default",
};

export const login = createAsyncThunk("user/login", async (body: ILoginBody) => {
  const res = await postLogin(body);
  const data = {
    pk: res.data.userId,
    uid: res.data.uid,
    nickname: res.data.nickname,
    token: res.headers["access-token"],
  };
  return JSON.stringify(data);
});

export const refresh = createAsyncThunk("user/refresh", async () => {
  const res = await getRefresh();
  const data = {
    pk: res.data.userId,
    uid: res.data.uid,
    nickname: res.data.nickname,
    token: res.headers["access-token"],
  };
  return JSON.stringify(data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "default";
      state.isUser = false;
      state.pk = undefined;
      state.uid = undefined;
      state.nickname = undefined;
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
      state.pk = undefined;
      state.uid = undefined;
      state.nickname = undefined;
      state.token = undefined;
      state.isUser = false;
    });

    builder.addCase(refresh.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(refresh.fulfilled, (state, { payload }) => {
      state.status = "success";
      const { pk, uid, nickname, token } = JSON.parse(payload);
      state.pk = pk;
      state.uid = uid;
      state.nickname = nickname;
      state.token = token;
      state.isUser = true;
    });
    builder.addCase(refresh.rejected, (state) => {
      state.status = "default";
      state.isUser = false;
      state.pk = undefined;
      state.uid = undefined;
      state.nickname = undefined;
      state.token = undefined;
    });
  },
});

export const { logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
