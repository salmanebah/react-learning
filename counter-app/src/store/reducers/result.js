import * as actionTypes from '../actions';


const initialState = {
    result: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_RESULT: {
            return {
                ...state,
                result: state.result.concat({id: new Date(), value: action.currentValue})
            }
        }
        case actionTypes.DELETE_RESULT: {
            const newResult = state.result.filter(current => current.id !== action.id);
            
            return {
                ...state,
                result: newResult
            }
        }
        default:
            return state;
    }
}

export default reducer;