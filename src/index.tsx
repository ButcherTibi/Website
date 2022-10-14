import React from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './Store/Store';
import { BrowserRouter } from 'react-router-dom';

import App from './App/App';
import './index.scss';

const root = createRoot(document.getElementById('root')!);

root.render(
  // <React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
  // </React.StrictMode>
);
