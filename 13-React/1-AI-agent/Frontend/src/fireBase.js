// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBN8nplynDAkIPNblUKTfrfG-pq_R9t0cY",
  authDomain: "todos-with-react-a7641.firebaseapp.com",
  projectId: "todos-with-react-a7641",
  storageBucket: "todos-with-react-a7641.appspot.com",
  messagingSenderId: "658362620225",
  appId: "1:658362620225:web:d10459f09280a9afea29c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
