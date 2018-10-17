import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

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
        }
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
                
        return (
            <div className={classes.Auth}>
                <form>
                    {inputs}
                    <Button btnType='Success'>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default Auth;