import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  allChanels: [],
  NewChanel: [],
  NewChanelData: [],
  ChanelCreated: false,
};

export const ChanelSlice = createSlice({
  name: "chanels",
  initialState,
  reducers: {
    AllChanelsRedcuer: (state: any, action: any) => {
      state.allChanels = action.payload;
    },
    CreateNewChanelsRedcuer: (state: any, action: any) => {},

    ActionGenaralChanging: (state: any, action: any) => {
      if (!state.NewChanelData.length) {
        state.NewChanelData = [{ general: {} }];
        state.NewChanelData[0].general["name"] = action.payload;
      } else {
        state.NewChanelData[0].general["name"] = action.payload;
      }
      if (action.payload.length <= 0) {
        state.ChanelCreated = false;
      } else {
        state.ChanelCreated = true;
      }
    },
    ActionGeneral: (state: any, action: any) => {
      if (!state.NewChanelData.length) {
        state.NewChanelData = [{ general: {} }];
        state.NewChanelData[0].general = action.payload;
      } else {
        state.NewChanelData[0].general = action.payload;
      }
      state.ChanelCreated = true;
    },

    ActionTags: (state: any, action: any) => {
      if (!state.NewChanelData.length) {
        state.NewChanelData = [{ tags: {} }];
        state.NewChanelData[0].tags = action.payload;
      } else {
        state.NewChanelData[0].tags = action.payload;
      }
    },
    ActionOther: (state: any, action: any) => {
      if (!state.NewChanelData.length) {
        state.NewChanelData = [{ other: {} }];
        state.NewChanelData[0].other = action.payload;
      } else {
        state.NewChanelData[0].other = action.payload;
      }
    },
    CreditDetails: (state: any, action: any) => {
      if (!state.NewChanelData.length) {
        state.NewChanelData = [{ creditDetails: {} }];
        state.NewChanelData[0].creditDetails = action.payload;
      } else {
        state.NewChanelData[0].creditDetails = action.payload;
      }
    },
    ResetNewChanel: (state: any) => {
      state.NewChanelData = [];
      state.ChanelCreated = false;
    },
    ResetChanelName: (state: any) => {
      state.ChanelCreated = false;
    },
  },
});

export const {
  AllChanelsRedcuer,
  ActionGenaralChanging,
  ActionGeneral,
  ActionTags,
  ActionOther,
  CreditDetails,
  ResetNewChanel,
  ResetChanelName,
} = ChanelSlice.actions;
const AllReducers = ChanelSlice.reducer;
export default AllReducers;
