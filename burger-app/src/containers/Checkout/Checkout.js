import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Checkout extends Component {

    componentWillMount() {
        this.props.onPurchaseStart();
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');   
    }

    render() {
        if (this.props.ingredients === null) {
            return (
                <Redirect to='/' />
            );
        }
        const purchasedRedirect = (this.props.purchased) ? <Redirect to='/' /> : null
        return (
            <div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ingredients} 
                                 checkoutCancelled={this.checkoutCancelledHandler}
                                 checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPurchaseStart: () => dispatch(actionCreators.purchaseInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);