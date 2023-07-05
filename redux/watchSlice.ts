import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  currentlyWatchingId: string;
};

const initialState: initStateType = {
  currentlyWatchingId: "",
};

const currentlyWatching = createSlice({
  name: "currentWatch",
  initialState,
  reducers: {
    setCurrentWatchData: (state, action) => {
      state.currentlyWatchingId = action.payload;
    },
  },
});

export const { setCurrentWatchData } = currentlyWatching.actions;

export default currentlyWatching.reducer;
