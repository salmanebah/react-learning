import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';


class Auth extends Component {

    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: ''
            }
        },
        isSignup: true
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = {
            ...this.state.controls
        };
        const updatedFormElement = {
            ...updatedForm[inputId]
        };
        updatedFormElement.value = event.target.value;
        updatedForm[inputId] = updatedFormElement;
        this.setState({controls: updatedForm});
        
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthentication(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    toggleAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let inputs = formElements.map(element => (<Input key={element.id} 
                                                     elementType={element.config.elementType}
                                                     elementConfig={element.config.elementConfig}
                                                     value={element.config.value} 
                                                     onChange={(event) => this.inputChangedHandler(event, element.id)}/>));
        if (this.props.loading) {
            return <Spinner></Spinner>
        }
        let errorMessage = null;
        if (this.props.error !== null) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {inputs}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button onClick={this.toggleAuthModeHandler}
                    btnType='Danger'>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthentication: (email, password, isSignup) => dispatch(actions.authenticateAsync(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);