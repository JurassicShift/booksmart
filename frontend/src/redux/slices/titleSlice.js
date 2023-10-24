import { createSlice } from '@reduxjs/toolkit';

export const Slice = createSlice({
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


export const { updateTitle } = Slice.actions;

export default Slice.reducer;