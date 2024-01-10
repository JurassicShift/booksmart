import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	active: false,
	username: '',
	imgUrl: ''
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		updateLogin: (state, action) => {
			return {
				...state,
				active: action.payload.active,
				username: action.payload.username,
				imgUrl: action.payload.imgUrl
			};
		},
		resetLogin: state => {
			return {
				...state,
				active: initialState.active,
				username: initialState.username,
				imgUrl: initialState.imgUrl
			};
		},
		resetUrl: state => {
			return {
				...state,
				imgUrl: initialState.imgUrl
			};
		},
		updateUrl: (state, action) => {
			return {
				...state,
				imgUrl: action.payload
			};
		},
	},
});

export const { updateLogin, resetLogin, resetUrl, updateUrl } = loginSlice.actions;

export default loginSlice.reducer;
