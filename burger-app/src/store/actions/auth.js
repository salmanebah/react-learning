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

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
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
        }).then(response => dispatch(authSuccess(response.data)))
          .catch(error => dispatch(authFail(error)));
       
    }
}