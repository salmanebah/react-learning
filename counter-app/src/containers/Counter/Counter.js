import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0,
        result: []
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubstractCounter(5)}  />
                <hr />
                <button onClick={this.props.onStoredResult}>Store result</button>
                <ul>
                    {this.props.result.map((res) => (<li key={res.id} 
                                                                onClick={() => this.props.onDeletedResult(res.id)}>
                                                                {res.value}
                                                            </li>))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        counter: state.counter,
        result: state.result
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddCounter: (step) => dispatch({type: 'ADD', step}),
        onSubstractCounter: (step) => dispatch({type: 'SUBSTRACT', step}),
        onStoredResult: () => dispatch({type: 'STORE_RESULT'}),
        onDeletedResult: (id) => dispatch({type: 'DELETE_RESULT', id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);