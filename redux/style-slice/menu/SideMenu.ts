import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MenuBoolean: false,
  menuBooleanAllOver: true,
  menuWidth: 0,
};

export const SideMenu = createSlice({
  name: "side-menu",
  initialState,
  reducers: {
    ToggleMenu: (state: any) => {
      state.MenuBoolean = !state.MenuBoolean;
    },
    MenuWidth: (state: any, action: any) => {
      const playload = action.payload;
      state.menuWidth = playload;
    },
    ToggleMenuOverAll: (state: any, action: any) => {
      const playload = action.payload;
      if (playload === "false") {
        state.menuBooleanAllOver = false;
      } else if (playload === "true") {
        state.menuBooleanAllOver = true;
      }
    },
  },
});

export const { ToggleMenu, MenuWidth, ToggleMenuOverAll } = SideMenu.actions;
const AllReducers = SideMenu.reducer;
export default AllReducers;
