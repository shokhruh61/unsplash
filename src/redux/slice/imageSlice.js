import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  allImages: [],
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setAllImages: (state, action) => {
      state.allImages = action.payload;
    },
  },
});

export const { setSearchQuery, setAllImages } = imageSlice.actions;
export default imageSlice.reducer;
