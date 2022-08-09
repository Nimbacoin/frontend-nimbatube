import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allChanels: [],
};

export const ChanelSlice = createSlice({
  name: "chanels",
  initialState,
  reducers: {
    AllChanelsRedcuer: (state: any, action: any) => {
      state.allChanels = action.payload;
    },
  },
});

export const { AllChanelsRedcuer } = ChanelSlice.actions;
const AllReducers = ChanelSlice.reducer;
export default AllReducers;
