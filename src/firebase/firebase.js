import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG } from './config';

const firebase = initializeApp(FIREBASE_CONFIG);

export default firebase;