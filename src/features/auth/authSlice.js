/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    setProfile: (state, action) => {
      const imageId = action.payload;
      state.user.profilePic = imageId;
    },
    setProfileURL: (state, action) => {
      const profileURL = action.payload;
      state.user.profileURL = profileURL;
    },
    setFriendsList: (state, action) => {
      const friends = action.payload;
      state.user.friends = friends;
    },
    setFriendRequestList: (state, action) => {
      const friendRequests = action.payload;
      state.user.friendRequests = friendRequests;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  setCredentials, setProfile, setProfileURL,
  setFriendsList, setFriendRequestList, logout,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentUsername = (state) => state.auth.user.username;
export const selectCurrentId = (state) => state.auth.user._id;
export const selectCurrentFriends = (state) => state.auth.user.friends;
export const selectCurrentFriendRequests = (state) => state.auth.user.friendRequests;
export const selectCurrentToken = (state) => state.auth.token;
