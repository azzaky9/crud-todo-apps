import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

const apiKey = process.env.NEXT_PUBLIC_API_KEY,
  domain = process.env.NEXT_PUBLIC_DOMAIN,
  publicId = process.env.NEXT_PUBLIC_ID,
  bucket = process.env.NEXT_PUBLIC_BUCKET,
  sender = process.env.NEXT_PUBLIC_SENDER,
  appId = process.env.NEXT_PUBLIC_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: domain,
  projectId: publicId,
  storageBucket: bucket,
  messagingSenderId: sender,
  appId: appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const getTodosReference = (uid: string) => {
  return doc(db, "todos", uid);
};

export { auth, googleProvider, db, getTodosReference };
