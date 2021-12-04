import firebase from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDAZ0UDDoyO6Q7nUYRjTkAFzGd-C9fOm2Y",
  authDomain: "chat-app-dbc83.firebaseapp.com",
  projectId: "chat-app-dbc83",
  storageBucket: "chat-app-dbc83.appspot.com",
  messagingSenderId: "656128365474",
  appId: "1:656128365474:web:c95a0e75be310eb976d8fb",
  measurementId: "G-3BY0G5VWYJ"
};

const app = firebase.initializeApp(firebaseConfig);
getAnalytics(app);

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
  auth.useEmulator("http://localhost:9099");
  db.useEmulator("127.0.0.1", "8080")
}

export { auth, db };
export default firebase;