import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    let ingredientSummary = Object.keys(props.ingredients)
                                  .map(ingKey => <li key={ingKey}><span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>)
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout ?</p>
            <Button btnType="Danger" onClick={props.cancelPurchasingHandler}>CANCEL</Button>
            <Button btnType="Success" onClick={props.continuePurchasingHandler}>CONTINUE</Button>
        </Aux>
    )
}

export default OrderSummary;