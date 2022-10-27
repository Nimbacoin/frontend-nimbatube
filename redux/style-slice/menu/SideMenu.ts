import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MenuBoolean: false,
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
  },
});

export const { ToggleMenu, MenuWidth } = SideMenu.actions;
const AllReducers = SideMenu.reducer;
export default AllReducers;
