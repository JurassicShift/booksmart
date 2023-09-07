import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	btnLogin: false
};

export const btnLoginSlice = createSlice({
	name: 'btnLogin',
	initialState,
	reducers: {
		updateBtnLogin: (state) => {
			state.btnLogin = !state.btnLogin
		},
		
	},
});

export const { updateBtnLogin } = btnLoginSlice.actions;

export default btnLoginSlice.reducer;
