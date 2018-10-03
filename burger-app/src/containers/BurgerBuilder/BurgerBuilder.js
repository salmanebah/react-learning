import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => this.setState({ingredients: response.data}))
            .catch(error => this.setState({error: true}));
    }

    updatePurchaseState = (ingredients) => {
            const quantitySums = Object.keys(ingredients)
                                   .map(key => ingredients[key])
                                   .reduce((sum, curr) => sum + curr, 0);
        this.setState({purchasable: quantitySums > 0});
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    purchasingCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchasingContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                address: {
                    street: 'street 1',
                    zipCode: '53321',
                    country: 'France'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => this.setState({loading: false, purchasing: false}))
            .catch(error => this.setState({loading: false, purchasing: false}));
    }

    

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return 0;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeletion = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice - priceDeletion;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);

    }

    render() {
        const disabledInfos = {
            ...this.state.ingredients
        };
        for (let key in disabledInfos) {
            disabledInfos[key] = disabledInfos[key] <= 0;
        }

    

        let burger = (this.state.error) ? <p>Ingredient can't be loaded !</p> : <Spinner />;
        let orderSummary = null;
        if (this.state.ingredients !== null) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls onIngredientAdded={this.addIngredientHandler}
                       onIngredientRemoved={this.removeIngredientHandler} 
                       disabledInfos={disabledInfos} 
                       price={this.state.totalPrice}
                       purchasable={this.state.purchasable} 
                       onOrder={this.purchasingHandler}/>
              </Aux>);
            
            orderSummary = <OrderSummary ingredients={this.state.ingredients} 
                                         cancelPurchasingHandler={this.purchasingCancelHandler} 
                                         continuePurchasingHandler={this.purchasingContinueHandler} 
                                         totalPrice={this.state.totalPrice} />
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

export default  withErrorHandler(BurgerBuilder, axios);