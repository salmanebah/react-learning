import * as actionTypes from './actionTypes';


export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    }
}

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    }
}

export const add = (step) => {
    return {
        type: actionTypes.ADD,
        step
    }
}

export const substract = (step) => {
    return {
        type: actionTypes.SUBSTRACT,
        step
    }
}
