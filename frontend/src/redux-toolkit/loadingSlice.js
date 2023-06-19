import { createSlice } from "@reduxjs/toolkit";

const loadSlice = createSlice({
  name : 'loading',
  initialState : {
    loading : false
  },
  reducers : {
    setLoading : (state) => {
      state.loading = true
    },
    clearLoading : (state) => {
      state.loading = false
    }
  }
});

export const { setLoading, clearLoading } = loadSlice.actions
export default loadSlice.reducer

