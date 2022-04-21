import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from 'react-router-dom'
import history from './history'

ReactDOM.render(
  <BrowserRouter history={history}>
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
