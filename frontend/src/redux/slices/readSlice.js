import { createSlice } from "@reduxjs/toolkit";
import { dateProducer } from "../../helpers/indexHelpers.js";

const initialState = {
	data: [],
	date: dateProducer(),
};

export const readSlice = createSlice({
	name: "read",
	initialState,
	reducers: {
		addReadBook: (state, action) => {
			return {
				data: [action.payload, ...state.data],
				date: dateProducer(),
			};
		},
		addReadBooks: (state, action) => {
			return {
				data: [...state.data, ...action.payload],
				date: state.date,
			};
		},
		removeReadBook: (state, action) => {
			return {
				data: state.data.filter(book => book._id !== action.payload),
				date: dateProducer(),
			};
		},
		sortReadBooks: (state, action) => {
			return {
				data: [...action.payload],
				date: state.date,
			};
		},
		updateRating: (state, action) => {
			return {
				data: [...state.data].map(book => {
					if (book._id === action.payload._id) {
						return {
							...book,
							rating: action.payload.rating,
						};
					} else {
						return book;
					}
				}),
				date: dateProducer(),
			};
		},
		resetRead: () => {
			return initialState;
		},
	},
});

export const {
	addReadBook,
	addReadBooks,
	removeReadBook,
	sortReadBooks,
	updateRating,
	resetRead,
} = readSlice.actions;

export default readSlice.reducer;
