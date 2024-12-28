import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'cart'], // Only persist auth and cart
  blacklist: [], // Don't persist these reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
