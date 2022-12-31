import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  WindowHeight: 800,
  elementTop: 0,
  elemntLeft: 0,
  isOver: false,
  textValue: "",
  popUpp: false,
  popUppData: {},
  copyVideo: false,
  playList: false,
  cropping: false,
  croppingImg: {},
  croppedImg: "",
  phoneBarOpen: false,
  elementOverLayt: false,
  support: false,
  elementOverContent: [],
  walletConnect: true,
  wallet: false,
  walletAdress: "",
};

export const GeneralStyle = createSlice({
  name: "general-style",
  initialState,
  reducers: {
    WindowHeightRedcuer: (state: any, action: any) => {
      state.WindowHeight = action.payload;
    },
    overTextReducer: (state: any, action: any) => {
      state.elementTop = action.payload.top;
      state.elemntLeft = action.payload.left;
      state.textValue = action.payload.text;
      if (state.textValue?.length) {
        state.isOver = true;
      }
    },
    leaveTextReducer: (state: any) => {
      state.isOver = false;
      // state.elementTop = 0;
      // state.elemntLeft = 0;
      state.textValue = "";
    },
    poPUppRedcuer: (state: any, action: any) => {
      if (action.payload.data !== "") {
        state.popUpp = true;
        state.popUppData = action.payload.data;
      } else {
        state.popUpp = false;
      }
    },
    copyLinkRedcuer: (state: any, action: any) => {
      const payloadValue = action.payload.value;
      if (payloadValue === "true") {
        state.copyVideo = true;
      } else if (payloadValue === "false") {
        state.copyVideo = false;
      } else if (payloadValue === "toggle") {
        state.copyVideo = !state.copyVideo;
      }
    },
    playListRedcuer: (state: any, action: any) => {
      const payloadValue = action.payload.value;
      if (payloadValue === "true") {
        state.playList = true;
      } else if (payloadValue === "false") {
        state.playList = false;
      } else if (payloadValue === "toggle") {
        state.playList = !state.playList;
      }
    },
    croppingRedcuer: (state: any, action: any) => {
      state.cropping = !state.cropping;
      if (state.cropping && action.payload) {
        state.croppingImg = action.payload;
      }
    },
    FinishCroppingRedcuer: (state: any, action: any) => {
      state.cropping = !state.cropping;
      if (!state.cropping && action.payload) {
        state.croppedImg = action.payload;
      }
    },
    elementOverLaytRedcuer: (state: any) => {
      state.elementOverLayt = true;
      // state.elementOverContent = [action.payload];
    },
    elementOverLaytRedcuerHide: (state: any) => {
      state.elementOverLayt = false;
      // state.elementOverContent = [];
    },
    phoneBarOpenRedcuerHide: (state: any) => {
      state.phoneBarOpen = !state.phoneBarOpen;
    },
    supportReducer: (state: any, action: any) => {
      state.support = action.payload.value;
    },
    walletConnectReducer: (state: any, action: any) => {
      state.walletConnect = action.payload.value;
    },
    walletReducer: (state: any, action: any) => {
      if (typeof action.payload.value !== "undefined") {
        state.wallet = action.payload.value;
      }

      if (typeof action.payload.walletAdress !== "undefined") {
        state.walletAdress = action.payload.walletAdress;
      }
    },
  },
});

export const {
  WindowHeightRedcuer,
  overTextReducer,
  leaveTextReducer,
  poPUppRedcuer,
  copyLinkRedcuer,
  playListRedcuer,
  croppingRedcuer,
  FinishCroppingRedcuer,
  elementOverLaytRedcuer,
  elementOverLaytRedcuerHide,
  phoneBarOpenRedcuerHide,
  supportReducer,
  walletConnectReducer,
  walletReducer,
} = GeneralStyle.actions;
const AllReducers = GeneralStyle.reducer;
export default AllReducers;
