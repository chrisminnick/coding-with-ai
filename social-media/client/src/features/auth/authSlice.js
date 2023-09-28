// slice containing the auth state and actions

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await api.login(credentials);
  return response;
});

export const logout = createAsyncThunk('auth/logout', async (token) => {
  const response = await api.logout(token);
  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setToken, setIsLoading, setError } = authSlice.actions;
