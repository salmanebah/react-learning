import * as actionTypes from './actionTypes';

export const storeResult = (currentValue) => {
    return {
        type: actionTypes.STORE_RESULT,
        currentValue
    }
}

export const storeResultAsync = (currentValue) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(storeResult(currentValue));
        }, 2000);
    }
}

export const deleteResult = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        id
    }
}