import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import SideMenu from "./style-slice/menu/SideMenu";
import MainVideo from "./style-slice/video/MainVideo";

export const store = configureStore({
  reducer: {
    SideMenu,
    MainVideo,
  },
  middleware: [thunk],
});

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
