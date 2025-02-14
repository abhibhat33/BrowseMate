import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCxZKQbI2V3JfPMEPX8xgNNQoLu8zV9Hs4",
  authDomain: "browsemate.firebaseapp.com",
  projectId: "browsemate",
  storageBucket: "browsemate.appspot.com",
  messagingSenderId: "436944015698",
  appId: "1:436944015698:android:e787e31e99a41988832a8b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
