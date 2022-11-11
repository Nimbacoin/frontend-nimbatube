import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  videoData: {},
  mainVideoDataWatch: {},
  liveCommentsVideo: [],
  liveVideoComments: false,
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
      } else if (message === "followers") {
        console.log(
          "followers 1",
          current(state.mainVideoDataWatch.channelData.followers)
        );
        console.log("payload", action.payload.followers);
        state.mainVideoDataWatch.channelData.followers =
          action.payload.followers;
        // console.log("followers 1", current(state.mainVideoDataWatch));
      }
    },
    liveVideoLive: (state: any, action: any) => {
      const Action = action.payload.comments;
      if (Action) {
        console.log(Action.comments);
        state.liveCommentsVideo = action.payload.comments;
      }
    },
    liveVideoCommentsReducer: (state: any, action: any) => {
      state.liveVideoComments = !state.liveVideoComments;
    },
  },
});

export const {
  ActionVideoDataChanging,
  MainVideoDataReducer,
  liveVideoLive,
  liveVideoCommentsReducer,
} = VideoSlice.actions;
const AllReducers = VideoSlice.reducer;
export default AllReducers;
