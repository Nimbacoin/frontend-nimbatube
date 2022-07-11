import SideMenu from "./style-slice/menu/SideMenu";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import messageSliceReducer from "./message-slice/MessageSlice";

export const store = configureStore({
  reducer: {
    messageSliceReducer,
    SideMenu,
  },
  middleware: [thunk],
});

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
