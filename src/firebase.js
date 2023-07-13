import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_Domain,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STRORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
