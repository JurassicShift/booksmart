import { createSlice } from '@reduxjs/toolkit';

export const searchCategorySlice = createSlice({
  name: 'category',
  initialState: {
      category: 'title...',
      active: 0,
      data: []
  },
  reducers: {
    updateSearchCategory: (state, action) => {
      state.category = action.payload
    },
    updateActive: (state, action) => {
      state.active = action.payload
    },
    updateFetchedData: (state, action) => {
      state.data = [...state.data, ...action.payload]
    },
    removeDataItem: (state, action) => {
      state.data = state.data.filter(item => item.book_id !== action.payload)
    }
  }
})


export const { updateSearchCategory, updateActive, updateFetchedData, removeDataItem } = searchCategorySlice.actions;

export default searchCategorySlice.reducer;