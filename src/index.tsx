import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';

const container= document.getElementById('root')!;
const root = createRoot(container);

root.render(
  //@ts-ignore
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </Provider>
);
