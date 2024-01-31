import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	form1DummyOpen: null,
	form1Open: null,
	form2DummyOpen: null,
	form2Open: null,
};

export const formToggleSlice = createSlice({
	name: 'formToggleSlice',
	initialState,
	reducers: {
		updateForm1Dummy: (state, action) => {
			return { ...state, form1DummyOpen: action.payload };
		},
		updateForm1: (state, action) => {
			return { ...state, form1Open: action.payload };
		},
		updateForm2Dummy: (state, action) => {
			return { ...state, form2DummyOpen: action.payload };
		},
		updateForm2: (state, action) => {
			return { ...state, form2Open: action.payload };
		},
	},
});

export const { updateForm1Dummy, updateForm1, updateForm2Dummy, updateForm2 } =
	formToggleSlice.actions;

export default formToggleSlice.reducer;
