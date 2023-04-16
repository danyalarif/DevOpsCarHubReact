import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDelDzfTFIDyH4QO-keB-HFV5B0eAeV4js",
  authDomain: "testing-70648.firebaseapp.com",
  databaseURL: "https://testing-70648-default-rtdb.firebaseio.com",
  projectId: "testing-70648",
  storageBucket: "testing-70648.appspot.com",
  messagingSenderId: "475296634119",
  appId: "1:475296634119:web:9d2590f9e56e19d75221a2",
  measurementId: "G-BC1NZ3ENYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)