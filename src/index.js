import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import './App.css';

const REACT_APP_FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const REACT_APP_FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID

const firebaseConfig = {
  apiKey: "AIzaSyCYWl8mv_ErzgzPch8zA7oxkSjpZPbkhaQ",
  authDomain: "marvelous-91080.firebaseapp.com",
  projectId: "marvelous-91080",
  storageBucket: "marvelous-91080.appspot.com",
  messagingSenderId: "62043692510",
  appId: "1:62043692510:web:cb31fd8f0e8744e1e4d14f"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

