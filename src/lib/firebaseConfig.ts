// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnaijhEQ22XG0mYOXDgHDSi-DDPZio04c",
  authDomain: "cybersafe-community.firebaseapp.com",
  projectId: "cybersafe-community",
  storageBucket: "cybersafe-community.firebasestorage.app",
  messagingSenderId: "276051228239",
  appId: "1:276051228239:web:e2bef0908e2a7289f65c3a",
  measurementId: "G-WHXJMMFKKM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

