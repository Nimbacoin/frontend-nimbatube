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
      if (!state.general["name"]?.length) {
        state.ChanelCreated = false;
      } else {
        state.ChanelCreated = true;
      }
    },

    ActionTags: (state: any, action: any) => {
      if (!state.NewChanelData.length) {
        state.NewChanelData = [{ tags: {} }];
        state.NewChanelData[0].tags = action.payload;
      } else {
        state.NewChanelData[0].tags = action.payload;
      }
    },
    ActionOther: (state: any, action: any) => {},
    CreditDetails: (state: any, action: any) => {},
    ImagesReducer: (state: any, action: any) => {
      const Action = action.payload;
      if (Action.id === "profileImage") {
        state.images["profileImage"] = action.payload.profileImage;
      } else if (Action.id === "coverImage") {
        state.images["coverImage"] = action.payload.coverImage;
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
  ActionTags,
  ActionOther,
  CreditDetails,
  ResetNewChanel,
  ImagesReducer,
} = ChanelSlice.actions;
const AllReducers = ChanelSlice.reducer;
export default AllReducers;
