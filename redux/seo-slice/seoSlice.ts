import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  seoPage: {},
};

export const seoSlice = createSlice({
  name: "seo-slice",
  initialState,
  reducers: {
    seoReducer: (state: any, action: any) => {
      const title = action.payload.title;
      const descreption = action.payload.descreption;
      if (descreption) {
        state.seoPage.descreption = descreption;
      }
      if (title) {
        state.seoPage.title = title + " - Nimbatube";
      }
    },
  },
});

export const { seoReducer } = seoSlice.actions;
const AllReducers = seoSlice.reducer;
export default AllReducers;
