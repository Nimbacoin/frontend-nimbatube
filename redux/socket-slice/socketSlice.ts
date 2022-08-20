import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socketRedux: {},
  isSocket: false,
};

export const socketSlice = createSlice({
  name: "message-slice",
  initialState,
  reducers: {
    socketReduxRecuder: (state: any, action: any) => {
      state.socketRedux = action.payload;
      if (state.isSocket === false) {
        state.isSocket = true;
      }
    },
  },
});

export const { socketReduxRecuder } = socketSlice.actions;
const AllReducers = socketSlice.reducer;
export default AllReducers;
