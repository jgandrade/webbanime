import { configureStore } from "@reduxjs/toolkit";
import watchReducer from "./watchSlice";

export const store = configureStore({
  reducer: {
    currentlyWatching: watchReducer,
  },
});
