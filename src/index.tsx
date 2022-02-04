import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { initApi } from './api';
import App from './App';

// const createMyTheme = () =>
//   createTheme({
//     palette: {
//       primary: blue,
//       secondary: green,
//     },
//   });

initApi();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ThemeProvider theme={createMyTheme()}> */}
      <App />
      {/* </ThemeProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
