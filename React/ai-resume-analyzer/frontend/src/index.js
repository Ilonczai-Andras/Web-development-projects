import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // <- THIS IS CRITICAL for TailwindCSS
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="106801471026-bube0lc69emdoulnvn5evjerk1itrtvo.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
