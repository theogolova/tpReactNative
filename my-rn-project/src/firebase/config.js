import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCUAqqkLpovEGlwROrDX6kCOvPTfMHKEgg",
  authDomain: "database-5fdea.firebaseapp.com",
  projectId: "database-5fdea",
  storageBucket: "database-5fdea.firebasestorage.app",
  messagingSenderId: "903354597493",
  appId: "1:903354597493:web:232327c61cf4ec2a3d783c"
};

app.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
