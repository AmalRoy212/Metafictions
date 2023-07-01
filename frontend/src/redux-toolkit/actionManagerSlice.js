import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    count: 0,
    followCount : 0,
    popUp : false,
    yesButtonChoice : " ",
    singlePostId : null,
    liked : false ,
    followDetails : false
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
    },
    setPopUp : (state) => {
      state.popUp = true;
    },
    clearPopUp : (state) => {
      state.popUp = false;
    },
    setYesButtonChoice : (state,action) => {
      state.yesButtonChoice = action.payload
    },
    setPostId : (state,action) => {
      state.singlePostId = action.payload
    },
    setLiked : (state) => {
      state.liked = true
    },
    clearLiked : (state) => {
      state.liked = false
    },
    setFollowDetails : (state) => {
      state.followDetails = true;
    },
    clearFollowDetails : (state) => {
      state.followDetails = false;
    }
  },
});

export const { 
  incrementPostCount, 
  setPostCount, 
  setFollowCount,
  incrementFollowCount,
  setPopUp,
  clearPopUp,
  setYesButtonChoice,
  setPostId,
  setLiked,
  clearLiked,
  setFollowDetails,
  clearFollowDetails
} = postSlice.actions;
export default postSlice.reducer;
