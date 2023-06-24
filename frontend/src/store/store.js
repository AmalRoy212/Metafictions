import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../redux-toolkit/authSlice';
import postSlice from '../redux-toolkit/actionManagerSlice';
import loadingSlice from '../redux-toolkit/loadingSlice';
import adminAuthSlice from '../redux-toolkit/adminAuthSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    admin:adminAuthSlice,
    post: postSlice,
    loading : loadingSlice,
  },
  devTools: true,
});

export default store;
