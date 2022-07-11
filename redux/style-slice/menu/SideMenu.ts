import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MenuBoolean: false,
};

export const SideMenu = createSlice({
  name: "side-menu",
  initialState,
  reducers: {
    ToggleMenu: (state: any) => {
      state.MenuBoolean = !state.MenuBoolean;
    },
  },
});

export const { ToggleMenu } = SideMenu.actions;
const AllReducers = SideMenu.reducer;
export default AllReducers;
