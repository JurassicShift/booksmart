import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: false
  },
  reducers: {
    updateLogin: (state, action) => {
      state.value = !state.value
    }
  }
})


export const { updateLogin } = loginSlice.actions;

export default loginSlice.reducer;