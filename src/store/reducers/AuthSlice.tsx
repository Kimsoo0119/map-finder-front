import { createSlice } from "@reduxjs/toolkit";

interface TokenState {
  value: string;
}

const initialState: TokenState = {
  value: "",
};

export const tokenSlice = createSlice({
  name: "access token",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAccessToken } = tokenSlice.actions;

export default tokenSlice.reducer;
