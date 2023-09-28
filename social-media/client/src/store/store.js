import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authSlice } from '../features/auth/authSlice';
import { postsSlice } from '../features/posts/postsSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  posts: postsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
