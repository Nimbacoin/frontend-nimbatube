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
    ToggleCommentsOpen: (state: any) => {
      state.CommentsBoolean = true;
    },
    ToggleCommentsClose: (state: any) => {
      state.CommentsBoolean = false;
    },
  },
});

export const { ToggleCommentsOpen, ToggleCommentsClose, ToggleDescreption } =
  MainVideo.actions;
const AllReducers = MainVideo.reducer;
export default AllReducers;
