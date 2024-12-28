import { createSlice } from '@reduxjs/toolkit';

const demoUser = {
  email: 'test123@gmail.com',
  password: 'test123@gmail.com',
  name: 'Demo User',
  role: 'user'
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
    if (
      credentials.email === demoUser.email &&
      credentials.password === demoUser.password
    ) {
      dispatch(loginSuccess(demoUser));
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
