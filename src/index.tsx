import React from 'react';
// import { firebase_options } from './Security/FirebaseConfig';
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore'

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './Store/Store';
import { BrowserRouter } from 'react-router-dom';

import App from './App/App';
import './index.scss';

// Firebase
// export const firebase = initializeApp({})

// TODO: AppCheck reCaptcha3

// export const firestore = getFirestore(firebase)

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
