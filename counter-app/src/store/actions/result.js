
export const storeResult = (currentValue) => {
    return {
        type: STORE_RESULT,
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
        type: DELETE_RESULT,
        id
    }
}