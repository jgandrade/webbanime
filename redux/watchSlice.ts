import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  currentlyWatchingId: string;
  currentlyWatchingTitle: string;
};

const initialState: initStateType = {
  currentlyWatchingId: "",
  currentlyWatchingTitle: "",
};

const currentlyWatching = createSlice({
  name: "currentWatch",
  initialState,
  reducers: {
    setCurrentWatchData: (state, action) => {
      state.currentlyWatchingId = action.payload.animeId;
      state.currentlyWatchingTitle = action.payload.animetitle;
    },
  },
});

export const { setCurrentWatchData } = currentlyWatching.actions;

export default currentlyWatching.reducer;
