import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const wishSlice = createSlice({
	name: 'wish',
	initialState,
	reducers: {
		addBook: (state, action) => {
			return [...state, action.payload];
		},
		addBooks: (state, action) => {
			return [...state, ...action.payload];
		},
		sortBooks: (state, action) => {
			return [ ...action.payload];
		},
        removeBook: (state, action) => {
         return state.filter(book => book._id !== action.payload)
        }, 
		resetWish: () => {
			return initialState;
		}
	},
});

export const {addBook, addBooks, removeBook, resetWish, sortBooks } = wishSlice.actions;

export default wishSlice.reducer;
