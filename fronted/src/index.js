import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js'
//store use 
import { Provider } from "react-redux"
import store from "./Store"
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

