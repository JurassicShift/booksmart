import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
	name: "title",
	initialState: {
		value: "Genre",
		timesSearched: 0,
	},
	reducers: {
		updateTitle: (state, action) => {
			state.value = action.payload;
		},
		incrementTimesSearched: state => {
			state.timesSearched = state.timesSearched + 1;
		},
		resetTimesSearched: state => {
			state.timesSearched = 0;
		},
	},
});

export const { updateTitle, incrementTimesSearched, resetTimesSearched } =
	Slice.actions;

export default Slice.reducer;
