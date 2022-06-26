import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const { loading, msgError } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        email: 'prueba@gmail.com',
        password: '123123'
    })

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        //dispatch(login(123123), 'Pececito')

        dispatch(startLoginEmailPassword(email, password))
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }

    return (
        <>
            <h3 className="auth__title">Iniciar sesión</h3>

            <form onSubmit={handleLogin}>

                {
                    msgError &&
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                }

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Ingresar
                </button>

                
                <div className="auth__social-networks">
                    <p>Ingresá con tu red social</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Iniciá sesioń con google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/Journal-AppReact/auth/register"
                    className="link"
                >
                    Creá tu cuenta    
                </Link>

            </form>
        </>
    )
}
