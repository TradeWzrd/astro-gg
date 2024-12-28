import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// **Register User Thunk**
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/user/register', userData);
      return response.data; // Expecting user data with userId
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Registration failed!' });
    }
  }
);

// **Login User Thunk**
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/user/login', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed!' });
    }
  }
);

// **Logout User Thunk**
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    dispatch(clearUserData());
    toast.success('Logout successful!');
  }
);

// **Load User from Storage**
export const loadUserFromStorage = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) throw new Error('No user found');
    return user;
  } catch (error) {
    return rejectWithValue({ message: 'User not found in local storage' });
  }
});

// **Auth Slice Definition**
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    user: null,
    userId: null,
    isAuthenticated: false,
  },
  reducers: {
    clearUserData: (state) => {
      state.user = null;
      state.userId = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // **Load User from Local Storage**
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loadUserFromStorage.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // **Login Reducers**
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || {};
        state.userId = action.payload?.user?.userId || null;
        state.isAuthenticated = true;
        toast.success('Login successful!');
        localStorage.setItem('user', JSON.stringify(action.payload?.user)); // Save to localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || 'Login failed!');
      })
      // **Logout Reducer**
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        localStorage.removeItem('user'); // Remove from localStorage
      })
      // **Registration Reducers**
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || {};
        state.userId = action.payload?.user?.userId || null;
        state.isAuthenticated = true;
        toast.success('Registration successful! Welcome!');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || 'Registration failed!');
      });
  },
});

// **Export Actions and Reducer**
export const { clearUserData } = authSlice.actions;
export default authSlice.reducer;
