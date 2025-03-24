import { createSlice } from "@reduxjs/toolkit";

const loadLikedImages = () => {
  const saved = localStorage.getItem("likedImages");
  return saved ? JSON.parse(saved) : [];
};

const likedImagesSlice = createSlice({
  name: "likedImages",
  initialState: loadLikedImages(),
  reducers: {
    toggleLike: (state, action) => {
      const image = action.payload;
      const index = state.findIndex((img) => img.id === image.id);

      if (index >= 0) {
        state.splice(index, 1); // O'chirish
      } else {
        state.push(image); // Saqlash
      }

      localStorage.setItem("likedImages", JSON.stringify(state)); // LocalStorage update
    },
  },
});

export const { toggleLike } = likedImagesSlice.actions;
export default likedImagesSlice.reducer;
