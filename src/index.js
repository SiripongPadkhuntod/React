import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const root = ReactDOM.createRoot(document.getElementById('root'));

document.getElementById('root').classList.add('root');

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<App />} />
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
