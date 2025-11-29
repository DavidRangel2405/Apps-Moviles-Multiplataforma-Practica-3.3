import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, type Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA8p-a4Kuzn8M9NzkRKqJOmk5wqlWzMSaw',
  authDomain: 'crud-firebase-drg.firebaseapp.com',
  projectId: 'crud-firebase-drg',
  storageBucket: 'crud-firebase-drg.firebasestorage.app',
  messagingSenderId: '458891124598',
  appId: '1:458891124598:web:83f92c6ba2156415f6e457',
  databaseURL: 'https://crud-firebase-drg-default-rtdb.firebaseio.com',
};

let app: ReturnType<typeof initializeApp>;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db: Database = getDatabase(app);

export { app, db };