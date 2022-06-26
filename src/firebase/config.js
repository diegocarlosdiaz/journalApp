//Código copiado de firebase, creación de app web
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBqmuNsUWXMnSldu5P8MWv9YHAMZii4cR0",
    authDomain: "journal-app-react-38ef0.firebaseapp.com",
    projectId: "journal-app-react-38ef0",
    storageBucket: "journal-app-react-38ef0.appspot.com",
    messagingSenderId: "354748230660",
    appId: "1:354748230660:web:6ee56cf100550e64615951"
  };

// Inicializacón de Firebase
const app = initializeApp(firebaseConfig);

//Configuración de Firestore
const db = getFirestore(app);

// Configuración de la autenticación de Google
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider
}