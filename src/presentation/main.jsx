import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Get config from URL parameter if present (default to 'full')
const params = new URLSearchParams(window.location.search);
const config = params.get('config') || 'full';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App config={config} />
  </React.StrictMode>
);
