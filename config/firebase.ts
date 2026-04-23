import { initializeApp, getApp, getApps } from "firebase/app";
// @ts-ignore
import { Auth, initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { Firestore, initializeFirestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb-OVqYfw_2UrCsns77hWnEt0p6sl3QJ4",
  authDomain: "lumbini-smart-guide-6738b.firebaseapp.com",
  projectId: "lumbini-smart-guide-6738b",
  storageBucket: "lumbini-smart-guide-6738b.firebasestorage.app",
  messagingSenderId: "316110270695",
  appId: "1:316110270695:web:2a31d5bee0850b9a987242",
  measurementId: "G-34771X8E4E"
};

// Initialize Firebase
const isNewApp = getApps().length === 0;
const app = isNewApp ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth with React Native persistence
let auth: Auth;
if (isNewApp) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  auth = getAuth(app);
}

// Initialize Firestore Database with React Native specific settings
let db: Firestore;
if (isNewApp) {
  db = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  });
} else {
  db = getFirestore(app);
}

// Initialize Firebase Storage
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };
