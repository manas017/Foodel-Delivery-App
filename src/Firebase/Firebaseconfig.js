// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBj8PLCrOM2kSIRtGYd8k05TgesYPHPGNs",
  authDomain: "fooddel-64e37.firebaseapp.com",
  projectId: "fooddel-64e37",
  storageBucket: "fooddel-64e37.appspot.com",
  messagingSenderId: "890352583150",
  appId: "1:890352583150:web:d9eb35998a91aa55368eff",
  measurementId: "G-ZBDVKPL2T0"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }