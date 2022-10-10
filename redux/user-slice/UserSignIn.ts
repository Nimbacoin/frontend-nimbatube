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
      const paylaod = action.payload;
      console.log(paylaod);
      const Notification = state.Notification;
      if (paylaod.length) {
        state.Notification = paylaod;
        const noSeenNotfy = Notification.filter(
          ({ seen }: any) => seen == false
        );
        state.notificationNoSeen = paylaod;
      }
    },
  },
});

export const { UserSignedIn, UserSignOut, notificationReudcer } =
  UserSignIn.actions;
const AllReducers = UserSignIn.reducer;
export default AllReducers;
