import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	active: false,
	username: '',
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
			};
		},
		resetLogin: state => {
			return {
				...state,
				active: initialState.active,
				username: initialState.username,
			};
		},
	},
});

export const { updateLogin, resetLogin } = loginSlice.actions;

export default loginSlice.reducer;
