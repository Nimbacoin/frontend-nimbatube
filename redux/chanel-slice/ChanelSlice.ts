import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  allChanels: [],
  NewChanel: [],
  general: {},
  images: {},
  ChanelCreated: false,
};

export const ChanelSlice = createSlice({
  name: "chanels",
  initialState,
  reducers: {
    AllChanelsRedcuer: (state: any, action: any) => {
      state.allChanels = action.payload;
    },

    ActionGenaralChanging: (state: any, action: any) => {
      const Action = action.payload;
      if (Action.id === "input_title") {
        state.general["title"] = Action.input_title;
      } else if (Action.id === "input_name") {
        state.general["name"] = Action.input_name;
      } else if (Action.id === "text_desc") {
        state.general["description"] = Action.text_desc;
      }
      if (action.payload.length <= 0) {
        state.ChanelCreated = false;
      } else {
        state.ChanelCreated = true;
      }
    },
    Actiongeneral: (state: any, action: any) => {
      if (!state.NewChanelData.length) {
        state.NewChanelData = [{ general: {} }];
        state.NewChanelData[0].general = action.payload;
        console.log(state.NewChanelData[0]);
      } else {
        state.NewChanelData[0].general = action.payload;
        console.log(state.NewChanelData[0]);
      }
      state.ChanelCreated = true;
      console.log(current(state.NewChanelData));
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
    ImagesReducer: (state: any, action: any) => {
      const Action = action.payload;
      if (Action.id === "profileImage") {
        state.images["profileImage"] = action.payload.profileImage;
      }
    },
    ResetNewChanel: (state: any) => {
      state.general = {};
      state.ChanelCreated = false;
    },
  },
});

export const {
  AllChanelsRedcuer,
  ActionGenaralChanging,
  Actiongeneral,
  ActionTags,
  ActionOther,
  CreditDetails,
  ResetNewChanel,
  ImagesReducer,
} = ChanelSlice.actions;
const AllReducers = ChanelSlice.reducer;
export default AllReducers;
