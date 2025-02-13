// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "techguru-blog-1ec86.firebaseapp.com",
  projectId: "techguru-blog-1ec86",
  storageBucket: "techguru-blog-1ec86.firebasestorage.app",
  messagingSenderId: "808997272442",
  appId: "1:808997272442:web:b52efd058d3afc8925b4c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;