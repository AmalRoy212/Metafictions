import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name : 'notification',
  initialState : {
    notiLenght : null,
    newNots : null
  },
  reducers : {
    setNotLength : (state,action) => {
      state.notiLenght = action.payload;
    },
    addNotLength : (state,action) => {
      state.newNots = action.payload;
    }
  }
})

export const { setNotLength, addNotLength } = notificationSlice.actions;
export default notificationSlice.reducer;