// export const FIREBASE_CONFIG = {
//   apiKey: "AIzaSyDLBLSiCUNlWscO2CN-9iKvs93W_ZeIpZI",
//   authDomain: "h4zp-india.firebaseapp.com",
//   projectId: "h4zp-india",
//   storageBucket: "h4zp-india.appspot.com",
//   messagingSenderId: "395864357202",
//   appId: "1:395864357202:web:a7ee3381d2f79ba891628b"
// };
export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
