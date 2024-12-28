import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store'; // Import store and persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React app, wrapped with necessary providers
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {/* Toast notifications */}
        <Toaster />
        {/* Main app component */}
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
