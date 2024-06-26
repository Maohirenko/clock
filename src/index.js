import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import LanguageState from './components/context';
import './i18n';
import Loading from './components/lodading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <HelmetProvider>
    <LanguageState>
      <Suspense fallback={<Loading />}>
        <HashRouter >
          <App />
        </HashRouter>
      </Suspense>
    </LanguageState>
  </HelmetProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
