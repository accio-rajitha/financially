// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore, doc, setDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAurjtgASpBQSMoju0gEmHX0rAVTWGbIKQ",
  authDomain: "financially-50c44.firebaseapp.com",
  databaseURL: "https://financially-50c44-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "financially-50c44",
  storageBucket: "financially-50c44.appspot.com",
  messagingSenderId: "303678263936",
  appId: "1:303678263936:web:9825a98446468a97da4c65",
  measurementId: "G-CGJJX0MDCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};