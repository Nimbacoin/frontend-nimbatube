import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  activeUser: [],
  users: [],
  user: [],
  chatUser: 0,
  Rooms: [],
  socketRedux: {},
  isSocket: false,
  isTyping: false,
  rooms: [],
  fisrconvers: '',
  isSorting: 0,
  myAvatar: '',
};

export const messageSliceReducer = createSlice({
  name: 'message-slice',
  initialState,
  reducers: {
    PushMessage: (state: any, action: any) => {
      state.activeUser = [];
      if (state.activeUser.length === 0) {
        action.payload.map((mss: any) => {
          state.activeUser = [...state.activeUser, mss];
          state.messages = state.messages.concat(state.activeUser);
        });
      }
    },
    SetMessage: (state: any, action: any) => {
      if (!state.activeUser.some((mssg: any) => mssg._id === action.payload._id)) {
        state.activeUser = [...state.activeUser, action.payload];
        state.messages = state.messages.concat(state.activeUser);
      }
    },
    onlineUsers: (state: any, action: any) => {
      state.users = action.payload;
    },
    OnchatUser: (state: any, action: any) => {
      state.user = [];
      state.chatUser = state.chatUser + 1;
      const dataa = state.user;
      const usersavalible = dataa.find(
        (user: any) => user.conversationid === action.payload.conversationid
      );
      if (!usersavalible) {
        state.user = [action.payload];
      } else if (usersavalible) {
      }
    },
    RoomsUsers: (state: any, action: any) => {
      if (state.Rooms !== action.payload) {
        state.Rooms = action.payload;
      }
    },
    isTypinReducer: (state: any, action: any) => {
      if (state.isTyping === false && state.user.length >= 1) {
        const activeRoomId: string = state.user[0]?.conversationid;
        if (activeRoomId === action.payload) {
          state.isTyping = true;
        }
      }
    },
    isTypinReducerDisable: (state: any) => {
      if (state.isTyping === true) {
        state.isTyping = false;
      }
    },
    allRooms: (state: any, action: any) => {
      const actionPayload: any[] = action.payload;
      let stateRooms = state.rooms;
      if (!state.rooms.length) {
        if (state.rooms.length === 0) {
          if (state.rooms.length !== actionPayload.length) {
            state.rooms = actionPayload;
          }
        } else {
          state.rooms = state.rooms;
        }
      } else {
        const filtered = stateRooms.filter(({lastmessage}) => !lastmessage.message);
        if (filtered.length >= 1) {
          state.rooms = [filtered[0], ...actionPayload];
        } else {
          state.rooms = actionPayload;
        }
      }
    },
    AddRoom: (state: any, action: any) => {
      let Payload = action?.payload;
      const Conver: any[] = Payload?.conversation;
      if (Conver.length) {
        let Conversation: object = Conver[0];
        Payload.conversation = Conversation;
        if (!state.rooms.some(({conversation}) => conversation._id === Payload.conversation._id)) {
          state.rooms = [Payload, ...state.rooms];
        }
      }
    },
    addSocketRoom: (state: any, action: any) => {
      let Payload = action?.payload;
      if (!state.rooms.some(({conversation}) => conversation._id === Payload.conversation._id)) {
        state.rooms = [Payload, ...state.rooms];
      }
    },
    SortOnSendMessage: (state: any, action: any) => {
      state.fisrconvers = action.payload;
      state.isSorting = state.isSorting + 1;
    },
    userAvatar: (state: any, action: any) => {
      state.myAvatar = action.payload;
    },
    socketReduxRecuder: (state: any, action: any) => {
      state.socketRedux = action.payload;
      if (state.isSocket === false) {
        state.isSocket = true;
      }
    },
  },
});

export const {
  PushMessage,
  SetMessage,
  socketReduxRecuder,
  onlineUsers,
  OnchatUser,
  isTypinReducer,
  isTypinReducerDisable,
  allRooms,
  AddRoom,
  SortOnSendMessage,
  userAvatar,
  addSocketRoom,
} = messageSliceReducer.actions;
const AllReducers = messageSliceReducer.reducer;
export default AllReducers;
