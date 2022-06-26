export const errors = [
    {
        code: 'auth/email-already-exists',
        msg: 'El email ya se encuentra registrado.'
    },
    {
        code : 'auth/invalid-email',
        msg : "El email no es válido."
    },
    {
        code : 'Firebase: Error (auth/wrong-password).',
        msg : "La contraseña es incorrecta."
    },
    {
        code : 'Firebase: Error (auth/user-not-found).',
        msg : "Credenciales inválidas"
    },
    {
        code : 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).',
        msg : "Debido a reiterados intentos fallidos, su cuenta fue inhabilitada temporalmente. Intente más tarde"
    }
]