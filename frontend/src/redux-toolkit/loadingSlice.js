import { createSlice } from "@reduxjs/toolkit";

const loadSlice = createSlice({
  name : 'loading',
  initialState : {
    loading : false
  },
  reducers : {
    setLoading : (state,actions) => {
      state.loading = true
    },
    clearLoading : (state,actions) => {
      state.loading = false;
    }
  }
});

export const { setLoading, clearLoading } = loadSlice.actions
export default loadSlice.reducer

