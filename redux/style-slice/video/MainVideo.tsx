import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CommentsBoolean: false,
  DescreptionBoolean: false,
};

export const MainVideo = createSlice({
  name: "main-video",
  initialState,
  reducers: {
    ToggleDescreption: (state: any) => {
      state.DescreptionBoolean = !state.DescreptionBoolean;
    },
    ToggleComments: (state: any) => {
      state.CommentsBoolean = !state.CommentsBoolean;
    },
  },
});

export const { ToggleComments, ToggleDescreption } = MainVideo.actions;
const AllReducers = MainVideo.reducer;
export default AllReducers;
