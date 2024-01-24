import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import "antd/dist/antd.min.css";          // ant design CSS
// import { StyleProvider } from '@ant-design/cssinjs';
import {BrowserRouter} from 'react-router-dom'    // access to router

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);

reportWebVitals();
