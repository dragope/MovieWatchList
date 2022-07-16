import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseAppProvider } from 'reactfire'
import {firebaseConfig} from './firebase/firebase-config';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={'Connecting WatchList...'}>
        <App />
      </Suspense>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

