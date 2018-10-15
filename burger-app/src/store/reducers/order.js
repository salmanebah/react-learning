import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders : [],
    loading: false,
    purchased: false
}

const purchaseBurgerStart = (state, action) => {
    return {
        ...state,
        loading: true,
        purchased: false
    }
}

const purchaseBurgerSuccess = (state, action) => {
    const order = {
        ...action.orderData,
        id: action.orderId
    };
    return {
        ...state,
        orders: state.orders.concat(order),
        loading: false,
        purchased: true
    }
}

const purchaseBurgerFail = (state, action) => {
    return {
        ...state,
        loading: false
    }
}

const purchaseBurgerInit = (state, action) => {
    return {
        ...state,
        purchased: false
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_START: {
            return purchaseBurgerStart(state, action);
        }
        case actionTypes.PURCHASE_BURGER_SUCCESS: {
            return purchaseBurgerSuccess(state, action);
        }
        case actionTypes.PURCHASE_BURGER_FAIL: {
            return purchaseBurgerFail(state, action);
        }
        case actionTypes.PURCHASE_INIT: {
            return purchaseBurgerInit(state, action);
        }
        default:
            return state;
    }
}

export default reducer;