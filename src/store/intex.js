import { configureStore, createSlice } from "@reduxjs/toolkit";

const Authslice = createSlice({
  name: "Auth",
  initialState: { isloaing: false },
  reducers: {
    login(state) {
      state.isloaing = true;
    },
    logout(state) {
      state.isloaing = false;
    },
  },
});
export const authacton = Authslice.actions;
export const store = configureStore(Authslice);
