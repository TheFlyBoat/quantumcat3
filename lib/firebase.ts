
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-5841343011-cffec",
  "appId": "1:276050021558:web:4335118ef436b52c266a17",
  "apiKey": process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  "authDomain": "studio-5841343011-cffec.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "276050021558"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
