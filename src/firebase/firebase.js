import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG } from './config';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseApp = initializeApp(FIREBASE_CONFIG);

// firestore db export
export const FIRESTORE_DB = getFirestore(firebaseApp);
// firebase auth export
export const FIREBASE_AUTH = getAuth(firebaseApp);

export default firebaseApp;