import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: null,    // the latest selected place
  searches: [],      // all searches user has tried (history)
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    placeSelected(state, action) {
      const place = action.payload;

      state.selected = place;
      state.searches = [place, ...state.searches.filter(p => p.placeId !== place.placeId)];
      state.searches = state.searches.slice(0, 20);
    },
    clearHistory(state) {
      state.searches = [];
      state.selected = null;
    },
  },
});

export const { placeSelected, clearHistory } = placesSlice.actions;
export default placesSlice.reducer;
