import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserIsSignedIn: false,
  userdata: {},
};

export const UserSignIn = createSlice({
  name: "user-sign-in",
  initialState,
  reducers: {
    UserSignedIn: (state: any, action: any) => {
      state.UserIsSignedIn = true;
      state.userdata = action.payload;
    },
    UserSignOut: (state: any) => {
      state.UserIsSignedIn = false;
    },
  },
});

export const { UserSignedIn, UserSignOut } = UserSignIn.actions;
const AllReducers = UserSignIn.reducer;
export default AllReducers;
