import { createSlice } from '@reduxjs/toolkit';

const demoAccounts = {
  admin: {
    email: 'admin@demo.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  user: {
    email: 'test123@gmail.com',
    password: 'test123@gmail.com',
    name: 'Demo User',
    role: 'user'
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    }
  }
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

// Demo login thunk
export const loginUser = (credentials) => (dispatch) => {
  try {
    // Check admin credentials
    if (
      credentials.email === demoAccounts.admin.email &&
      credentials.password === demoAccounts.admin.password
    ) {
      dispatch(loginSuccess(demoAccounts.admin));
      return true;
    }
    // Check regular user credentials
    else if (
      credentials.email === demoAccounts.user.email &&
      credentials.password === demoAccounts.user.password
    ) {
      dispatch(loginSuccess(demoAccounts.user));
      return true;
    } else {
      dispatch(loginFailure('Invalid email or password'));
      return false;
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    return false;
  }
};

export default authSlice.reducer;
