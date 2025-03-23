import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedImages: [],
};

const likedImagesSlice = createSlice({
  name: "likedImages",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const imageId = action.payload;
      const isLiked = state.likedImages.includes(imageId);

      if (isLiked) {
        state.likedImages = state.likedImages.filter((id) => id !== imageId);
      } else {
        state.likedImages.push(imageId);
      }
    },
  },
});

export const { toggleLike } = likedImagesSlice.actions;
export default likedImagesSlice.reducer;
