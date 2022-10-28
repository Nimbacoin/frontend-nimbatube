import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MenuBoolean: false,
  menuBooleanAllOver: false,
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
        state.MenuBoolean;
      }
    },
  },
});

export const { ToggleMenu, MenuWidth } = SideMenu.actions;
const AllReducers = SideMenu.reducer;
export default AllReducers;
