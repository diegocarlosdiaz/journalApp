import { signInWithPopup, getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { googleAuthProvider } from "../firebase/config";
import { types } from "../types";
import { finishLoading, setError, startLoading } from "./ui";
import { errors } from '../errors';

export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {

        dispatch(startLoading())

        signInWithEmailAndPassword(getAuth(), email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
            })
            .catch(error => {
                console.error(error.message);
                dispatch(finishLoading());

                for (const elemento of errors) {
                    elemento.code === error.message && dispatch(setError(elemento.msg))
                }
            })
    }

}
//leer documentacion getAuth()
export const startRegisterWithEmailPasswordName = (email, password, name) => {
//Como no usamos el name del formulario hacemos un async await para actualizar los datos enviados a firebase y enviarle el name, 
//primero enviamos el usuario y despues actualizamos en un objeto la propiedad displayName
    return (dispatch) => {
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then( async ({ user }) => {
                console.log(user);
                
                await updateProfile(user, {
                    displayName: name
                })
                dispatch(login(user.uid, user.displayName))
            })
            .catch(error => console.log(error))
    }
}

//action que se dispara en loginscreen
export const startGoogleLogin = () => {
    return (dispatch) => {
        signInWithPopup(getAuth(), googleAuthProvider)
            .then(({ user }) => {
                //console.log(userCredential);
                // nos trae las credenciales del usuario (todo)
                dispatch(login(user.uid, user.displayName))
            })
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {

    return (dispatch) => {
        signOut(getAuth())
            .then( () => {
                dispatch(logout())
            })
            .catch(error => console.log(error))
    }
}

export const logout = () => ({type: types.logout})

/* 
export const login = (uid, displayName) => ({
    type: type.login,
    payload: {
        uid,
        displayName
    }
}) //con parentesis se aplica un return implícito

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}
*/