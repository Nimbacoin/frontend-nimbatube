import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  allChannels: [],
  NewChannel: [],
  general: {},
  images: {},
  ChannelCreated: false,
};

export const ChannelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    AllChannelsRedcuer: (state: any, action: any) => {
      state.allChannels = action.payload;
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
        state.ChannelCreated = false;
      } else {
        state.ChannelCreated = true;
      }
    },

    ActionTags: (state: any, action: any) => {
      if (!state.NewChannelData.length) {
        state.NewChannelData = [{ tags: {} }];
        state.NewChannelData[0].tags = action.payload;
      } else {
        state.NewChannelData[0].tags = action.payload;
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
    ResetNewChannel: (state: any) => {
      state.general = {};
      state.images = {};
      state.ChannelCreated = false;
    },
  },
});

export const {
  AllChannelsRedcuer,
  ActionGenaralChanging,
  ActionTags,
  ActionOther,
  CreditDetails,
  ResetNewChannel,
  ImagesReducer,
} = ChannelSlice.actions;
const AllReducers = ChannelSlice.reducer;
export default AllReducers;
