import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/Montserrat/Montserrat-VariableFont_wght.ttf';
import { BrowserRouter } from 'react-router-dom';
import LanguageState from './components/context';

import './i18n';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <LanguageState>
      <Suspense fallback={"loading"}>
      <App />
      </Suspense>
    </LanguageState>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
