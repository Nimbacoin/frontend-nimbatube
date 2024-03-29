import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserIsSignedIn: false,
  userdata: {},
  mainUserData: {},
  notification: [],
  notificationNoSeen: [],
};

export const UserSignIn = createSlice({
  name: "user-sign-in",
  initialState,
  reducers: {
    UserSignedIn: (state: any, action: any) => {
      state.UserIsSignedIn = true;
      if (typeof action.payload.data !== "undefined") {
        state.userdata = action.payload.data;
      }
      if (typeof action.payload.mainUserData !== "undefined") {
        state.mainUserData = action.payload.mainUserData;
      }
    },
    userSignedInReucerData: (state: any, action: any) => {
      state.UserIsSignedIn = true;
      if (typeof action.payload.data !== "undefined") {
        state.userdata = action.payload.data;
      }
    },
    UserSignOut: (state: any) => {
      state.UserIsSignedIn = false;
    },
    notificationReudcer: (state: any, action: any) => {
      const Payload = action.payload;
      state.notification = Payload;
      state.notificationNoSeen = Payload.filter(
        ({ vid }: any) => vid.seen == false
      );
    },
  },
});

export const {
  UserSignedIn,
  UserSignOut,
  notificationReudcer,
  userSignedInReucerData,
} = UserSignIn.actions;
const AllReducers = UserSignIn.reducer;
export default AllReducers;
