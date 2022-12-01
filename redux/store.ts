import socketSlice from "./socket-slice/socketSlice";
import VideoSlice from "./video-slice/VideoSlice";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import SideMenu from "./style-slice/menu/SideMenu";
import MainVideo from "./style-slice/video/MainVideo";
import GenrealStyle from "./style-slice/general-style/GenrealStyle";
import UserSignIn from "./user-slice/UserSignIn";
import ChannelSlice from "./channel-slice/ChannelSlice";
import seoReducer from "./seo-slice/seoSlice";
export const store = configureStore({
  reducer: {
    SideMenu,
    MainVideo,
    GenrealStyle,
    UserSignIn,
    ChannelSlice,
    VideoSlice,
    socketSlice,
    seoReducer,
  },
  middleware: [thunk],
});

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
