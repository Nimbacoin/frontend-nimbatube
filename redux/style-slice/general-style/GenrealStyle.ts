import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  WindowHeight: 800,
  elementTop: "0",
  elemntLeft: "0",
  isOver: false,
};

export const GeneralStyle = createSlice({
  name: "general-style",
  initialState,
  reducers: {
    WindowHeightRedcuer: (state: any, action: any) => {
      state.WindowHeight = action.payload;
    },
    overTextReducer: (state: any, action: any) => {
      state.elementTop = action.payload.top;
      state.elemntLeft = action.payload.left;
      state.isOver = true;
    },
    leaveTextReducer: (state: any) => {
      state.isOver = false;
      state.elementTop = 0;
      state.elemntLeft = 0;
    },
  },
});

export const { WindowHeightRedcuer, overTextReducer, leaveTextReducer } =
  GeneralStyle.actions;
const AllReducers = GeneralStyle.reducer;
export default AllReducers;
