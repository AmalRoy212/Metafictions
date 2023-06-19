import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    count: 0,
  },
  reducers: {
    incrementPostCount : (state) => {
      state.count += 1;
      console.log(state.count,'****************');
    },
    setPostCount : (state,action) => {
      state.count = action.payload
    }
  },
});

export const { incrementPostCount, setPostCount } = postSlice.actions;
export default postSlice.reducer;
