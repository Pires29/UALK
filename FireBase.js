// FireBase.js

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, onAuthStateChanged } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBt_OMLbbmEM5yfpntqerId0qhRYC-G1Ac",
    authDomain: "ualk-df1de.firebaseapp.com",
    projectId: "ualk-df1de",
    storageBucket: "ualk-df1de.appspot.com",
    messagingSenderId: "51990537524",
    appId: "1:51990537524:web:e2404ad68f0a2c8d49b161"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { app, auth, db };
