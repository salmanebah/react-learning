import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredientName
    }
};

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientName
    }
};

const initIngredients = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}



export const initIngredientsAsync = () => {
    return (dispatch) => {
         axios.get('/ingredients.json')
            .then(response => dispatch(initIngredients(response.data)))
            .catch(_ => dispatch(fetchIngredientsFailed()));
    }
}

