import * as actionTypes from './actionTypes';
import axios from 'axios';

// Test key, no worry :)
const API_KEY = 'AIzaSyCbQTLCLb47Cj25y84-k-fxG5uJWUJHxRs';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

const checkAuthTimeoutAsync = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const authenticateAsync = (email, password, isSignup) => {
    let method = isSignup ? 'signupNewUser' : 'verifyPassword';

    return (dispatch) => {
        dispatch(authStart());
        axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${method}?key=${API_KEY}`, {
            email,
            password,
            returnSecureToken: true
        }).then(response => {
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeoutAsync(response.data.expiresIn));
        })
        .catch(error => dispatch(authFail(error.response.data.error)));
       
    }
}