import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../services/api';
import { toast } from 'react-hot-toast';

<<<<<<< HEAD
// Check if user info is in localStorage to initialize state
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  user: userInfoFromStorage,
  isAuthenticated: Boolean(userInfoFromStorage),
=======
const initialState = {
  user: null,
  isAuthenticated: false,
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
  loading: false,
  error: null
};

// **Register User Thunk**
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
<<<<<<< HEAD
      const response = await authAPI.register(userData);
      toast.success('Registration successful!');
      
      // Store token in localStorage for the axios interceptor
      localStorage.setItem('userInfo', JSON.stringify(response.data));
=======
      const response = await axios.post('http://localhost:4000/api/v1/user/register', userData);
      toast.success('Registration successful!');
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed!');
      return rejectWithValue(error.response?.data || { message: 'Registration failed!' });
    }
  }
);

// **Login User Thunk**
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
<<<<<<< HEAD
      const response = await authAPI.login(userData);
      toast.success('Login successful!');
      
      // Store token in localStorage for the axios interceptor
      localStorage.setItem('userInfo', JSON.stringify(response.data));
=======
      const response = await axios.post('http://localhost:4000/api/v1/user/login', userData);
      toast.success('Login successful!');
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
      return rejectWithValue(error.response?.data || { message: 'Login failed!' });
    }
  }
);

// **Logout User Thunk**
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    // Remove token from localStorage
    localStorage.removeItem('userInfo');
    dispatch(clearUserData());
    toast.success('Logout successful!');
    return null;
  }
);

<<<<<<< HEAD
// **Get User Profile Thunk**
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getUserProfile();
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to get user profile');
      return rejectWithValue(error.response?.data || { message: 'Failed to get user profile' });
    }
  }
);

// **Update User Profile Thunk**
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateUserProfile(userData);
      toast.success('Profile updated successfully!');
      
      // Update stored user info
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed');
      return rejectWithValue(error.response?.data || { message: 'Profile update failed' });
    }
  }
);

=======
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
<<<<<<< HEAD
      state.error = null;
    },
    updateAdminStatus: (state, action) => {
      state.user = action.payload;
      // Keep other authentication state consistent
      state.isAuthenticated = true;
      state.loading = false;
=======
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
<<<<<<< HEAD
        state.user = action.payload; // Updated to match MongoDB backend response
=======
        state.user = action.payload.user;
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
      })
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
<<<<<<< HEAD
        state.user = action.payload; // Updated to match MongoDB backend response
=======
        state.user = action.payload.user;
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
<<<<<<< HEAD
      })
      // Get user profile cases
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to get user profile';
      })
      // Update user profile cases
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Profile update failed';
=======
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
      });
  },
});

<<<<<<< HEAD
export const { clearUserData, updateAdminStatus } = authSlice.actions;
=======
export const { clearUserData } = authSlice.actions;
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
export default authSlice.reducer;
