import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    count: 0,
    followCount : 0
  },
  reducers: {
    incrementPostCount : (state) => {
      state.count += 1;
    },
    setPostCount : (state,action) => {
      state.count = action.payload
    },
    setFollowCount : (state,action) => {
      state.followCount = action.payload
    },
    incrementFollowCount : (state,action) => {
      state.followCount += 1
    }
  },
});

export const { 
  incrementPostCount, 
  setPostCount, 
  setFollowCount,
  incrementFollowCount
} = postSlice.actions;
export default postSlice.reducer;
