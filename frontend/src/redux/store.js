import { configureStore } from '@reduxjs/toolkit'
import titleSlice from './slices/titleSlice.js';
import searchCategorySlice from './slices/searchCategorySlice.js';
import loginSlice from './slices/loginSlice.js';
import  btnLoginSlice  from './slices/btnLoginSlice.js';
import wishSlice from './slices/wishSlice.js';
import toastSlice from './slices/toastSlice.js';
import readSlice from './slices/readSlice.js';
import tabsSlice from './slices/tabsSlice.js';

export default configureStore({
  reducer: {
    title: titleSlice,
    category: searchCategorySlice,
    login: loginSlice,
    btnLogin: btnLoginSlice,
    wish: wishSlice,
    toast: toastSlice,
    read: readSlice,
    tabs: tabsSlice
  }
})