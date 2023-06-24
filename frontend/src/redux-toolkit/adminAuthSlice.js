import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminToken : localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : null
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers : {
    login : (state,action) => {
      state.token = action.payload;
      localStorage.setItem('adminToken',action.payload);
    },
    logout : (state,action) => {
      state.token = null
      localStorage.removeItem('adminToken');
    }
  }
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer;