import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import './App.css';

const REACT_APP_FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const REACT_APP_FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID

const MARVEL_API_KEY = process.env.MARVEL_API_KEY
const MARVEL_HASH = process.env.MARVEL_HASH

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: "marvelous-91080.firebaseapp.com",
  projectId: "marvelous-91080",
  storageBucket: "marvelous-91080.appspot.com",
  messagingSenderId: "62043692510",
  appId: REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

