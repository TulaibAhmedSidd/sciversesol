import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "todos",
  initialState: {
    userdata: null,
    token: null,
    whatsAppNumber: null,
  },
  reducers: {
    addtoken(state, action) {
      state.token = action.payload;
    },
    adduserdata(state, action) {
      state.userdata = action.payload;
    },
    setwhatsAppNumber(state, action) {
      state.whatsAppNumber = action.payload;
    },
  },
});

export const { addtoken, adduserdata, setwhatsAppNumber } = authSlice.actions;
export default authSlice.reducer;
