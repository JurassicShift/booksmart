import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	deleteDummy: null,
	deleteForm: null,
	updateDummy: null,
	updateForm: null,
};

export const formToggleSlice = createSlice({
	name: 'formToggle',
	initialState,
	reducers: {
		updateDummyFn: (state, action) => {
			return { ...state, updateDummy: action.payload };
		},
		updateFormFn: (state, action) => {
			return { ...state, updateForm: action.payload };
		},
		deleteDummyFn: (state, action) => {
			return { ...state, deleteDummy: action.payload };
		},
		deleteFormFn: (state, action) => {
			return { ...state, deleteForm: action.payload };
		},
	},
});

export const { updateDummyFn, updateFormFn, deleteDummyFn, deleteFormFn } =
	formToggleSlice.actions;

export default formToggleSlice.reducer;
