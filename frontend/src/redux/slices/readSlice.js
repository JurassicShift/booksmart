import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const readSlice = createSlice({
	name: 'read',
	initialState,
	reducers: {
		addReadBook: (state, action) => {
			return [...state, action.payload];
		},
		addReadBooks: (state, action) => {
			return [...state, ...action.payload];
		},
        removeReadBook: (state, action) => {
         return state.filter(book => book._id !== action.payload)
        },
		resetRead: () => {
			return initialState;
		}
	},
});

export const { addReadBook, addReadBooks, removeReadBook, resetRead } = readSlice.actions;

export default readSlice.reducer;
