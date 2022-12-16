import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalContextProvider } from './core/context/GlobalContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <GlobalContextProvider>
    <React.Suspense fallback='Loading Language...'>
      <App />
    </React.Suspense>
  </GlobalContextProvider>
);
