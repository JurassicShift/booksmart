import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	active: false,
	notice: '',
    message: '',
	type: ''
};

export const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		updateToast: (state, action) => {
			return {
				...state,
				active: action.payload.active,
				notice: action.payload.notice,
				type: action.payload.type
			};
		},
		resetToast: state => {
			return {
				...state,
				active: initialState.active,
				notice: initialState.notice,
				type: initialState.type
			};
		},
	},
});

export const { updateToast, resetToast } = toastSlice.actions;

export default toastSlice.reducer;