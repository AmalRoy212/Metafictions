import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token : localStorage.getItem('token') ? localStorage.getItem('token') : null
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers : {
    login : (state,action) => {
      state.token = action.payload;
      localStorage.setItem('token',action.payload);
    },
    logout : (state,action) => {
      state.token = null
      localStorage.removeItem('token');
    }
  }
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer;