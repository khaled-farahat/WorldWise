// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA83aJ3_QsxbYMpWZFEXTu_0A8ocPIvNQY",
  authDomain: "worldwise-747fd.firebaseapp.com",
  projectId: "worldwise-747fd",
  storageBucket: "worldwise-747fd.appspot.com",
  messagingSenderId: "38686390928",
  appId: "1:38686390928:web:35219a5bd9539e72d53615",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;
