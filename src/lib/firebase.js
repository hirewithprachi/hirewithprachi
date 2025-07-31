// Firebase config and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore'; // Uncomment if using Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBtIME2J8DIHmAmiAebghIQcheC3_4NnPU",
  authDomain: "hire-with-prachi.firebaseapp.com",
  projectId: "hire-with-prachi",
  storageBucket: "hire-with-prachi.firebasestorage.app",
  messagingSenderId: "658860228408",
  appId: "1:658860228408:web:9b6db192f11d1593828bcd",
  measurementId: "G-SNSCP1S3BC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
// const db = getFirestore(app); // Uncomment if using Firestore

// export { app, auth, googleProvider };
// export { app, auth, googleProvider, db }; 