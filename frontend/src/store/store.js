import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../redux-toolkit/authSlice';
import postSlice from '../redux-toolkit/postSlice';
import loadingSlice from '../redux-toolkit/loadingSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    loading : loadingSlice,
  },
  devTools: true,
});

export default store;
