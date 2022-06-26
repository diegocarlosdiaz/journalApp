import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui)
    //console.log(msgError);

    const [formValues, handleInputChange] = useForm({
        name: 'Prueba',
        email: 'prueba@gmail.com',
        password: '123123',
        password2: '123123'
    })

    const {name, email, password, password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault()
        // console.log(name, email, password, password2);
        if(isFormValid()) {
            //console.log('Formulario correcto');
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = () => {

        switch (true) {
            case name.trim().length === 0:
                dispatch(setError('Nombre requerido'))
                return false;
            case !validator.isEmail(email):
                dispatch(setError('Email inválido'))
                return false;
            case password.length < 6:
                dispatch(setError('La contraseña debe tener mínimo 6 caracteres'))
                return false;
            case password !== password2:
                dispatch(setError('Las contraseñas no coinciden'))
                return false;
        
            default:
                dispatch(removeError())
                return true;
        }

        
    }

    return (
        <>
            <h3 className="auth__title">Registro</h3>
            

            <form onSubmit={handleRegister}>

                {
                    msgError &&
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

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

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Registrar
                </button>



                <Link 
                    to="/Journal-AppReact/auth/login"
                    className="link"
                >
                    ¿Estás registrado/a?
                </Link>

            </form>
        </>
    )
}
