import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import SideMenu from "./style-slice/menu/SideMenu";
import MainVideo from "./style-slice/video/MainVideo";
import GenrealStyle from "./style-slice/general-style/GenrealStyle";
import UserSignIn from "./user-slice/UserSignIn";
import ChanelSlice from "./chanel-slice/ChanelSlice";

export const store = configureStore({
  reducer: {
    SideMenu,
    MainVideo,
    GenrealStyle,
    UserSignIn,
    ChanelSlice,
  },
  middleware: [thunk],
});

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
