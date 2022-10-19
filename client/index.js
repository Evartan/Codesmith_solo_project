import React from 'react';
import App from './App.jsx';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

// uncomment so that webpack can bundle styles
import './stylesheets/style.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
