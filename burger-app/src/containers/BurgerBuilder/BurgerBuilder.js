import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
       /*  axios.get('/ingredients.json')
            .then(response => this.setState({ingredients: response.data}))
            .catch(error => this.setState({error: true})); */
    }

    updatePurchaseState = (ingredients) => {
            const quantitySums = Object.keys(ingredients)
                                   .map(key => ingredients[key])
                                   .reduce((sum, curr) => sum + curr, 0);
            return quantitySums > 0;
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    purchasingCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchasingContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfos = {
            ...this.props.ingredients
        };
        for (let key in disabledInfos) {
            disabledInfos[key] = disabledInfos[key] <= 0;
        }

    

        let burger = (this.state.error) ? <p>Ingredient can't be loaded !</p> : <Spinner />;
        let orderSummary = null;
        if (this.props.ingredients !== null) {
            burger = (<Aux>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls onIngredientAdded={this.props.onIngredientAdded}
                       onIngredientRemoved={this.props.onIngredientRemoved}
                       disabledInfos={disabledInfos} 
                       price={this.props.price}
                       purchasable={this.updatePurchaseState(this.props.ingredients)}
                       onOrder={this.purchasingHandler}/>
              </Aux>);
            
            orderSummary = <OrderSummary ingredients={this.props.ingredients} 
                                         cancelPurchasingHandler={this.purchasingCancelHandler} 
                                         continuePurchasingHandler={this.purchasingContinueHandler} 
                                         totalPrice={this.props.price} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.price
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
        onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));