import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoData: {},
};

export const VideoSlice = createSlice({
  name: "video-slice",
  initialState,
  reducers: {
    ActionVideoDataChanging: (state: any, action: any) => {
      const Action = action.payload;
      if (Action.id === "input_title") {
        state.videoData["title"] = Action.input_title;
      } else if (Action.id === "text_desc") {
        state.videoData["descreption"] = Action.text_desc;
      } else if (Action.id === "video_id") {
        state.videoData["video_id"] = Action.video_id;
      }
    },
  },
});

export const { ActionVideoDataChanging } = VideoSlice.actions;
const AllReducers = VideoSlice.reducer;
export default AllReducers;
