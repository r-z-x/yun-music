import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './assets/css/reset.css'
import './assets/js/remScale'

import 'swiper/js/swiper.min'
import 'swiper/css/swiper.min.css'
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
