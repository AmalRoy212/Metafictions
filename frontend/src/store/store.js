import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../redux-toolkit/authSlice';
import postSlice from '../redux-toolkit/actionManagerSlice';
import loadingSlice from '../redux-toolkit/loadingSlice';
import adminAuthSlice from '../redux-toolkit/adminAuthSlice';
import notificationSlice from '../redux-toolkit/notificationSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    admin:adminAuthSlice,
    post: postSlice,
    loading : loadingSlice,
    notification : notificationSlice,
  },
  devTools: true,
});

export default store;
