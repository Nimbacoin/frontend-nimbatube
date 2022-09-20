import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoData: {},
  mainVideoDataWatch: {},
};

export const VideoSlice = createSlice({
  name: "video-slice",
  initialState,
  reducers: {
    ActionVideoDataChanging: (state: any, action: any) => {
      const Action = action.payload;
      if (Action.id === "title") {
        console.log(Action.title);
        state.videoData["title"] = Action.title;
      } else if (Action.id === "text_desc") {
        state.videoData["descreption"] = Action.text_desc;
      } else if (Action.id === "video_id") {
        state.videoData["video_id"] = Action.video_id;
      }
    },
    MainVideoDataReducer: (state: any, action: any) => {
      const message = action.payload.message;
      console.log("data", action.payload);
      if (message === "data") {
        state.mainVideoDataWatch = action.payload.data;
      } else if (message === "comments") {
        state.mainVideoDataWatch.responseData.comments =
          action.payload.comments;
        console.log(state.mainVideoDataWatch.responseData.comments);
      }
    },
  },
});

export const { ActionVideoDataChanging, MainVideoDataReducer } =
  VideoSlice.actions;
const AllReducers = VideoSlice.reducer;
export default AllReducers;
