import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  videoData: {},
  mainVideoDataWatch: {},
  liveCommentsVideo: [],
  liveVideoComments: false,
  liveVideoCreate: false,
  nextVideo: "",
};

export const VideoSlice = createSlice({
  name: "video-slice",
  initialState,
  reducers: {
    ActionVideoDataChanging: (state: any, action: any) => {
      const Action = action.payload;
      if (Action.id === "title") {
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
        state.mainVideoDataWatch.channelData.followers =
          action.payload.followers;
      }
    },
    liveVideoLive: (state: any, action: any) => {
      const Action = action.payload.comments;
      if (Action) {
        state.liveCommentsVideo = action.payload.comments;
      }
    },
    liveVideoCommentsReducer: (state: any) => {
      state.liveVideoComments = !state.liveVideoComments;
    },
    nextVideoReducer: (state: any, action) => {
      state.nextVideo = action.payload;
    },
    liveVideoCreate: (state: any, action) => {
      state.liveVideoCreate = action.payload;
    },
  },
});

export const {
  ActionVideoDataChanging,
  MainVideoDataReducer,
  liveVideoLive,
  liveVideoCommentsReducer,
  nextVideoReducer,
  liveVideoCreate,
} = VideoSlice.actions;
const AllReducers = VideoSlice.reducer;
export default AllReducers;
