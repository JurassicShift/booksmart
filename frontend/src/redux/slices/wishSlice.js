import { createSlice } from '@reduxjs/toolkit';
import { dateProducer } from '../../helpers/indexHelpers.js';

const initialState = {
	data: [],
	date: dateProducer()
}

export const wishSlice = createSlice({
	name: 'wish',
	initialState,
	reducers: {
		addBook: (state, action) => {
			return {
				data: [...state.data, action.payload],
				date: dateProducer()
			}
		},
		addBooks: (state, action) => {
			return {
				data: [...state.data, ...action.payload],
				date: state.date
			}
		},
		sortBooks: (state, action) => {
			return {
				data: [ ...action.payload],
				date: state.date
			}
		},
        removeBook: (state, action) => {
			return {
				data: state.data.filter(book => book._id !== action.payload),
				date: dateProducer()
			}
        }, 
		resetWish: () => {
			return initialState;
		}
	},
});

export const {addBook, addBooks, removeBook, resetWish, sortBooks } = wishSlice.actions;

export default wishSlice.reducer;
