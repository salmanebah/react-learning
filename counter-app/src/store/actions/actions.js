export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBSTRACT = 'SUBSTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';


export const increment = () => {
    return {
        type: INCREMENT
    }
}

export const decrement = () => {
    return {
        type: DECREMENT
    }
}

export const add = (step) => {
    return {
        type: ADD,
        step
    }
}

export const substract = (step) => {
    return {
        type: SUBSTRACT,
        step
    }
}

export const storeResult = (currentValue) => {
    return {
        type: STORE_RESULT,
        currentValue
    }
}

export const deleteResult = (id) => {
    return {
        type: DELETE_RESULT,
        id
    }
}