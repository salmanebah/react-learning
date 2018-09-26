import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        alert('Continue');
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

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                                  cancelPurchasingHandler={this.purchasingCancelHandler} 
                                  continuePurchasingHandler={this.purchasingContinueHandler} 
                                  totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls onIngredientAdded={this.addIngredientHandler}
                               onIngredientRemoved={this.removeIngredientHandler} 
                               disabledInfos={disabledInfos} 
                               price={this.state.totalPrice}
                               purchasable={this.state.purchasable} 
                               onOrder={this.purchasingHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;