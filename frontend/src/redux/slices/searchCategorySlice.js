import { createSlice } from '@reduxjs/toolkit';

export const searchCategorySlice = createSlice({
  name: 'category',
  initialState: {
    value: {
      category: 'title...',
      active: 0,
      data: []
    }
  },
  reducers: {
    updateSearchCategory: (state, action) => {
      state.value.category = action.payload
    },
    updateActive: (state, action) => {
      state.value.active = action.payload
    },
    updateFetchedData: (state, action) => {
      state.value.data = action.payload
    }
  }
})


export const { updateSearchCategory, updateActive, updateFetchedData } = searchCategorySlice.actions;

export default searchCategorySlice.reducer;