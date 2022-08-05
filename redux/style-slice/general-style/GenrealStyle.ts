import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  WindowHeight: 800,
};

export const GeneralStyle = createSlice({
  name: "general-style",
  initialState,
  reducers: {
    WindowHeightRedcuer: (state: any, action: any) => {
      state.WindowHeight = action.payload;
    },
  },
});

export const { WindowHeightRedcuer } = GeneralStyle.actions;
const AllReducers = GeneralStyle.reducer;
export default AllReducers;
