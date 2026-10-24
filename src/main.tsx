import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

// PWA Service Worker Registration with Base URL Compatibility
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const swPath = `${import.meta.env.BASE_URL || './'}sw.js`.replace(/\/\//g, '/');
    navigator.serviceWorker.register(swPath).catch((err) => {
      console.log('Service Worker registration failed:', err);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
