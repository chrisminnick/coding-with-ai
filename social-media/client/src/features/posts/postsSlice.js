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
  const response = await api.get('posts', token);
  return response.posts;
});

export const getPost = createAsyncThunk(
  'posts/getPost',
  async ({ token, postId }) => {
    console.dir(`postId: ${postId}`);
    const response = await api.get('posts', token, postId);
    return response.post.json();
  }
);

export const postPost = createAsyncThunk(
  'posts/postPost',
  async (body, token) => {
    console.log(`body: ${JSON.stringify(body)} token: ${token}`);
    const response = await api.post('posts', token, body);
    return response.json();
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, addPost, setIsLoading, setError } = postsSlice.actions;
