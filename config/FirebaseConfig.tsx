// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "vineet-kumar-projects.firebaseapp.com",
  projectId: "vineet-kumar-projects",
  storageBucket: "vineet-kumar-projects.firebasestorage.app",
  messagingSenderId: "166378849938",
  appId: "1:166378849938:web:1ed5f327dcd8c718da884b",
  measurementId: "G-KX041XF3DJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firebase Auth with AsyncStorage persistence
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// const persistence = Platform.OS === 'web'
//            ? browserSessionPersistence
//            : getReactNativePersistence(ReactNativeAsyncStorage);
//        export const auth = initializeAuth(app, {persistence});