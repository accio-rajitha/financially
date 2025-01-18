// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc, setDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj442EpAHJp2zr5sdGNQB_j4b8AAVi9D8",
  authDomain: "financely-ee3fa.firebaseapp.com",
  projectId: "financely-ee3fa",
  storageBucket: "financely-ee3fa.firebasestorage.app",
  messagingSenderId: "662217745110",
  appId: "1:662217745110:web:a9597c3673f807865cdf77",
  measurementId: "G-4TCV9ZQ4S7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };