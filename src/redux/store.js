import { configureStore } from "@reduxjs/toolkit";
import likedImagesReducer from "./likedImagesSlice";

export const store = configureStore({
  reducer: {
    likedImages: likedImagesReducer,
  },
});
