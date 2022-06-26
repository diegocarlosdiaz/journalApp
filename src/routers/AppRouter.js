import React, { useEffect, useState } from 'react';
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { loadNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        onAuthStateChanged(getAuth(), user => {
            //console.log(user)
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true);

                dispatch(loadNotes())

            } else {
                setIsLoggedIn(false)
            }

            setChecking(false)
        })
        
    }, [dispatch]);

    if(checking) {
        return (
            <div className="auth__main">
                <div className="sk-fading-circle">
                    <div className="sk-circle1 sk-circle"></div>
                    <div className="sk-circle2 sk-circle"></div>
                    <div className="sk-circle3 sk-circle"></div>
                    <div className="sk-circle4 sk-circle"></div>
                    <div className="sk-circle5 sk-circle"></div>
                    <div className="sk-circle6 sk-circle"></div>
                    <div className="sk-circle7 sk-circle"></div>
                    <div className="sk-circle8 sk-circle"></div>
                    <div className="sk-circle9 sk-circle"></div>
                    <div className="sk-circle10 sk-circle"></div>
                    <div className="sk-circle11 sk-circle"></div>
                    <div className="sk-circle12 sk-circle"></div>
                </div>
            </div>
        )
    }


    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route 
                        path="/Journal-AppReact/auth/*"
                        element={ 
                        !isLoggedIn 
                        ? 
                        <AuthRouter/> 
                        :
                        <JournalScreen/>
                        }
                    />

                    <Route 
                        path="/Journal-AppReact/"
                        element={ 
                        isLoggedIn 
                        ?
                        <JournalScreen/> 
                        :
                        <div className="auth__main">
                            <div className="auth__box-container">
                                <LoginScreen/>
                            </div>

                        </div>
                        }
                    />
                    <Route path='/' element={<Navigate to='/Journal-AppReact/'/>}/>

                </Routes>
            </div>
        </BrowserRouter>
    )
}
