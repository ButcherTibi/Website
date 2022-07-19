import React from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './App/AppStore';
import { BrowserRouter } from 'react-router-dom';

import App from './App/App';


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
