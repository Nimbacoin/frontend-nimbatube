import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  WindowHeight: 800,
  elementTop: 0,
  elemntLeft: 0,
  isOver: false,
  textValue: "",
  popUpp: false,
  popUppData: {},
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
      state.textValue = action.payload.text;
      if (state.textValue.length) {
        state.isOver = true;
      }
    },
    leaveTextReducer: (state: any) => {
      state.isOver = false;
      // state.elementTop = 0;
      // state.elemntLeft = 0;
      state.textValue = "";
    },
    poPUppRedcuer: (state: any, action: any) => {
      if (action.payload.data !== "") {
        state.popUpp = true;
        state.popUppData = action.payload.data;
      } else {
        state.popUpp = false;
      }
    },
  },
});

export const {
  WindowHeightRedcuer,
  overTextReducer,
  leaveTextReducer,
  poPUppRedcuer,
} = GeneralStyle.actions;
const AllReducers = GeneralStyle.reducer;
export default AllReducers;
