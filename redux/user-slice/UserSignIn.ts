import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserIsSignedIn: false,
};

export const UserSignIn = createSlice({
  name: "user-sign-in",
  initialState,
  reducers: {
    UserSignedIn: (state: any) => {
      state.UserIsSignedIn = true;
    },
    UserSignOut: (state: any) => {
      state.UserIsSignedIn = false;
    },
  },
});

export const { UserSignedIn, UserSignOut } = UserSignIn.actions;
const AllReducers = UserSignIn.reducer;
export default AllReducers;
