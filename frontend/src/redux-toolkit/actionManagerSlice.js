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
    followDetails : false,
    chatUpdated : false,
    Notification : []
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
    },
    setChatUpdate : (state) => {
      state.chatUpdated = true;
    },
    clearChatUpdate : (state) => {
      state.chatUpdated = false;
    },
    setNotifcations : (state, action) => {
      console.log(action.payload,"**********");
      if (state.Notification.length > 0){
        state.Notification = [action.payload,...state.Notification]
      }
      state.Notification = action.payload
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
  clearFollowDetails,
  setChatUpdate,
  clearChatUpdate,
  setNotifcations
} = postSlice.actions;
export default postSlice.reducer;
