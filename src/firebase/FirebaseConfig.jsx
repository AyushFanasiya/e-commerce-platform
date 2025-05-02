// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3KFRTh3fuRwm6_vuXpcB7t8GGx9GJEz0",
  authDomain: "e-commerce-84e68.firebaseapp.com",
  projectId: "e-commerce-84e68",
  storageBucket: "e-commerce-84e68.firebasestorage.app",
  messagingSenderId: "118020120684",
  appId: "1:118020120684:web:877be37078472f21e13849",
  measurementId: "G-3TECPMND0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage }