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

const fetchOrdersStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false
    }
}

const fetchOrdersFail = (state, action) => {
    return {
        ...state,
        loading: false
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
        case actionTypes.FETCH_ORDERS_START: {
            return fetchOrdersStart(state, action);
        }
        case actionTypes.FETCH_ORDERS_SUCCESS: {
            return fetchOrdersSuccess(state, action);
        }
        case actionTypes.FETCH_ORDERS_FAIL: {
            return fetchOrdersFail(state, action);
        }
        default:
            return state;
    }
}

export default reducer;