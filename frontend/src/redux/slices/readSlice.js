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
		sortReadBooks: (state, action) => {
			return [ ...action.payload];
		},
		updateRating: (state, action) => {
			
			return [...state].map(book => {
				if(book._id === action.payload._id) {
					return {
						...book,
						rating: action.payload.rating
					}
				} else {
					return book;
				}
			})
		},
		resetRead: () => {
			return initialState;
		}
	},
});

export const { addReadBook, addReadBooks, removeReadBook, sortReadBooks, updateRating, resetRead } = readSlice.actions;

export default readSlice.reducer;
