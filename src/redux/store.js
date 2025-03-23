import { configureStore, createSlice } from "@reduxjs/toolkit";

// LocalStorage dan o'qish
const getLocalStorage = () => {
  const data = localStorage.getItem("likedImages");
  return data ? JSON.parse(data) : [];
};

// Redux Slice
const likedSlice = createSlice({
  name: "liked",
  initialState: { likedImages: getLocalStorage() },
  reducers: {
    addToLiked: (state, action) => {
      state.likedImages.push(action.payload);
      localStorage.setItem("likedImages", JSON.stringify(state.likedImages));
    },
    removeFromLiked: (state, action) => {
      state.likedImages = state.likedImages.filter(
        (img) => img.id !== action.payload.id,
      );
      localStorage.setItem("likedImages", JSON.stringify(state.likedImages));
    },
  },
});

export const { addToLiked, removeFromLiked } = likedSlice.actions;

export const store = configureStore({
  reducer: {
    likedImages: likedSlice.reducer,
  },
});
