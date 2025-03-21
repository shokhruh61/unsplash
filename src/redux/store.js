import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./slice/imageSlice";

const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});

export default store;
