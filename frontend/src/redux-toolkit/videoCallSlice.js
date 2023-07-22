import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoCall : false
}

const videoCallSlice = createSlice({
  name: 'videoCall',
  initialState,
  reducers: {
    turnOnVideoCall: (state) => {
      state.videoCall = true;
    },
    turnOffVideoCall: (state) => {
      state.videoCall = false
    }
  }
});

export const { turnOnVideoCall, turnOffVideoCall } = videoCallSlice.actions

export default videoCallSlice.reducer;