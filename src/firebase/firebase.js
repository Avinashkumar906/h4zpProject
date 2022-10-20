import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG } from './config';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseApp = initializeApp(FIREBASE_CONFIG);

// firestore db export
export const FIRESTORE_DB = getFirestore(firebaseApp);

export default firebaseApp;