import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import cartReducer from './CartSlice'; // Optional, if you have a cart reducer

// Import redux-persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Local storage

// Set up persist configuration for the auth slice
const persistConfig = {
  key: 'auth',  // This will persist only the 'auth' slice
  storage,      // Local storage
  whitelist: ['user', 'isAuthenticated'], // Persist only the necessary properties
};

// Create a persisted reducer for auth
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: cartReducer, // Optional if you use cart slice
  },
});

const persistor = persistStore(store);

export { store, persistor };
