import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot from 'react-dom/client'
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { GlobalContextProvider } from './contexts/GlobalContext';

// Get the root element
const rootElement = document.getElementById('root');

// Check if the rootElement exists
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <GlobalContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GlobalContextProvider>
      </AuthProvider>
    </React.StrictMode>
  );

  reportWebVitals();
} else {
  console.error("Root element not found");
}
