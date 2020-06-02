export const AUTH_ON = 'AUTH_ON';
export const AUTH_OFF = 'AUTH_OFF';
export const AUTH_TOKEN_ON = 'AUTH_TOKEN_ON';
export const REGISTRATION_REDIRECT = 'REGISTRATION_REDIRECT';


export const authOn = (auth) => {
    return {
        type: AUTH_ON,
        payload: auth
    }
}

export const authOff = () => {
    return {
        type: AUTH_OFF
    }
}

export const authTokenOn = (token) => {
    return {
        type: AUTH_TOKEN_ON,
        payload: token
    }
}

export const registrationRedirect = (token) => {
    return {
        type: REGISTRATION_REDIRECT,
        payload: token
    }
}

