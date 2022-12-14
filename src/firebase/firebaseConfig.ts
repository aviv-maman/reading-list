// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBc0u7TRHY-lm6fV02QmLMY3wq379ZrgU0',
  authDomain: 'reading-list-3b915.firebaseapp.com',
  projectId: 'reading-list-3b915',
  storageBucket: 'reading-list-3b915.appspot.com',
  messagingSenderId: '804428310475',
  appId: '1:804428310475:web:10b29a47d1450c1f38384e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { db, auth };
