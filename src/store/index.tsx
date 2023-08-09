import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducers/AuthSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
