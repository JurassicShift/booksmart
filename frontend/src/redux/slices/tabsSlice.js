import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	active: 0
};

export const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		updateTabs: (state, action) => {
			return {
				active: action.payload
			};
		},
	
	},
});

export const { updateTabs } = tabsSlice.actions;

export default tabsSlice.reducer;
