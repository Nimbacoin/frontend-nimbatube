import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserIsSignedIn: false,
  userdata: {},
  notification: [],
  notificationNoSeen: [],
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
    notificationReudcer: (state: any, action: any) => {
      const Payload = action.payload;
      state.notification = Payload;
      console.log(Payload);
      state.notificationNoSeen = Payload.filter(
        ({ vid }: any) => vid.seen == false
      );
    },
  },
});

export const { UserSignedIn, UserSignOut, notificationReudcer } =
  UserSignIn.actions;
const AllReducers = UserSignIn.reducer;
export default AllReducers;
