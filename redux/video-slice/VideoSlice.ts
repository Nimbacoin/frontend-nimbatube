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

      if (message === "data") {
        state.mainVideoDataWatch = action.payload.data;
      } else if (message === "comments") {
        state.mainVideoDataWatch.responseData.comments =
          action.payload.comments;
      } else if (message === "follwers") {
        console.log(
          "sdsdsdssdsd",
          state.mainVideoDataWatch.channelData.follwers
        );
        console.log("sdsdsdssdsd", action.payload.follwers);
        state.mainVideoDataWatch.channelData.follwers = action.payload.follwers;
      }
    },
  },
});

export const { ActionVideoDataChanging, MainVideoDataReducer } =
  VideoSlice.actions;
const AllReducers = VideoSlice.reducer;
export default AllReducers;
