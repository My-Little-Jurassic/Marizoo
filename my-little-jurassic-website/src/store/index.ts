import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";
import broadcastReducer from "./broadcastSlice";
import broadcastModalReducer from "./broadcastModalSlice";

export const store = configureStore({
  // 로그인 유지용 access-token store
  reducer: {
    user: userReducer,
    modal: modalReducer,
    broadcast: broadcastReducer,
    broadcastModal: broadcastModalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
