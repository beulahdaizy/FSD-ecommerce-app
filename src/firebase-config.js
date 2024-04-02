import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9HyESOSbeecHGfed6qRHZwUa-h7fo030",
  authDomain: "my-ecommerce-app-f05be.firebaseapp.com",
  projectId: "my-ecommerce-app-f05be",
  storageBucket: "my-ecommerce-app-f05be.appspot.com",
  messagingSenderId: "892815846007",
  appId: "1:892815846007:web:dfd71832637b899154f472",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
