import { initializeApp, getApps } from "firebase/app";

import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    QuerySnapshot,
    DocumentData,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    limit,
    where
} from "firebase/firestore/lite";

import { getAuth, signInWithEmailAndPassword, signOut,onAuthStateChanged,createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAvAsbc7IIGSciHxJmMOL2sKEvBkZLuasc",

    authDomain: "dasthavej.firebaseapp.com",

    projectId: "dasthavej",

    storageBucket: "dasthavej.appspot.com",

    messagingSenderId: "637241990667",

    appId: "1:637241990667:web:2621551804f7eec16ab10e"

};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const db = getFirestore(app);

const auth = getAuth(app);



export {
    db,
    collection,
    addDoc,
    setDoc,
    getDocs,
    orderBy,
    query,
    doc,
    getDoc,
    serverTimestamp,
    QuerySnapshot,
    DocumentData,
    updateDoc,
    auth,
    signInWithEmailAndPassword,
    signOut,
    deleteDoc,
    limit,
    where,
    onAuthStateChanged,
    createUserWithEmailAndPassword
};