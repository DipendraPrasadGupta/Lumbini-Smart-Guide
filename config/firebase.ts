import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore Database
const db = getFirestore(app);

export { app, auth, db };
