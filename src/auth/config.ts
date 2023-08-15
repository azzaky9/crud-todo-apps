import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_DOMAIN;
const publicId = process.env.NEXT_PUBLIC_ID;
const bucket = process.env.NEXT_PUBLIC_BUCKET;
const sender = process.env.NEXT_PUBLIC_SENDER;
const appId = process.env.NEXT_PUBLIC_APP_ID;

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
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db, app };
