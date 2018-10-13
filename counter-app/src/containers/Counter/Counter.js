import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionCreators from '../../store/actions/index';

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
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: (step) => dispatch(actionCreators.add(step)),
        onSubstractCounter: (step) => dispatch(actionCreators.substract(step)),
        onStoredResult: (currentValue) => dispatch(actionCreators.storeResultAsync(currentValue)),
        onDeletedResult: (id) => dispatch(actionCreators.deleteResult(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);