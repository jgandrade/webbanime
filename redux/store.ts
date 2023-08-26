import { configureStore } from "@reduxjs/toolkit";
import watchReducer from "./watchSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    currentlyWatching: watchReducer,
  },
});
