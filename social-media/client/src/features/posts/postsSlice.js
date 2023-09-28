// slice containing the posts state and actions
//
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const getPosts = createAsyncThunk('posts/getPosts', async (token) => {
  const response = await api.getPosts(token);
  return response.data;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, setIsLoading, setError } = postsSlice.actions;
