
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlpPOGYLyzHe_NW6oEipxSPQ3yOO6Vvzs",
  authDomain: "portfolio-69d4a.firebaseapp.com",
  projectId: "portfolio-69d4a",
  storageBucket: "portfolio-69d4a.firebasestorage.app",
  messagingSenderId: "518880268618",
  appId: "1:518880268618:web:071ac186eb6d3268b5f1b3",
  measurementId: "G-8MVQW2NRX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
