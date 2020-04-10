// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyD_M-JKykopE7AYWRS25u75I-7ezGZRC0I',
  authDomain: 'slab-1c276.firebaseapp.com',
  databaseURL: 'https://slab-1c276.firebaseio.com',
  projectId: 'slab-1c276',
  storageBucket: 'slab-1c276.appspot.com',
  messagingSenderId: '373909496634',
  appId: '1:373909496634:web:8f8517a18e5bef1b03e603',
  measurementId: 'G-EJXNPB22XP'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseDb = firebaseApp.database()

export {
  firebaseAuth,
  firebaseDb
}
