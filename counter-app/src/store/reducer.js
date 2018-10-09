
const initialState = {
    counter: 0,
    result: [1]
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            }
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.step
            }
        case 'SUBSTRACT':
            return {
                ...state,
                counter: state.counter - action.step
            }
        case 'STORE_RESULT': {
            return {
                ...state,
                result: state.result.concat({id: new Date(), value: state.counter})
            }
        }
        case 'DELETE_RESULT': {
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