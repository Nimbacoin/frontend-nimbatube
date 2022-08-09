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
      // console.log(current(state.NewChanelData));
      console.log(state.NewChanelData);
    },
    ActionGeneral: (state: any, action: any) => {
      if (!state.NewChanelData.length) {
        state.NewChanelData = [{ general: {} }];
        state.NewChanelData[0].general = action.payload;
      } else {
        state.NewChanelData[0].general = action.payload;
      }
    },

    ActionTags: (state: any, action: any) => {},
    ActionOther: (state: any, action: any) => {},
    CreditDetails: (state: any, action: any) => {},
  },
});

export const { AllChanelsRedcuer, ActionGenaralChanging, ActionGeneral } =
  ChanelSlice.actions;
const AllReducers = ChanelSlice.reducer;
export default AllReducers;
