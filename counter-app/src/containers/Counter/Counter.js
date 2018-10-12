import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import {increment, decrement, add, substract, storeResult, deleteResult } from '../../store/actions/actions';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubstractCounter(5)}  />
                <hr />
                <button onClick={() => this.props.onStoredResult(this.props.counter)}>Store result</button>
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
        counter: state.ctr.counter,
        result: state.res.result
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => dispatch(increment()),
        onDecrementCounter: () => dispatch(decrement()),
        onAddCounter: (step) => dispatch(add(step)),
        onSubstractCounter: (step) => dispatch(substract(step)),
        onStoredResult: (currentValue) => dispatch(storeResult(currentValue)),
        onDeletedResult: (id) => dispatch(deleteResult(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);