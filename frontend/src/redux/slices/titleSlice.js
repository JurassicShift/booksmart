import { createSlice } from '@reduxjs/toolkit';

export const titleSlice = createSlice({
  name: 'title',
  initialState: {
    value: 'Genre'
  },
  reducers: {
    updateTitle: (state, action) => {
      state.value = action.payload
    }
  }
})


export const { updateTitle } = titleSlice.actions;

export default titleSlice.reducer;