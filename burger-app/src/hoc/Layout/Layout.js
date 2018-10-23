import React, {Component} from "react";
import {connect} from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true});
    }

    sideDrawerToggleHandler = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer});
    }
    
    render() { 
        return (
            <Aux>
                <Toolbar  isAuthenticated={this.props.isAuthenticated} onDrawerToggle={this.sideDrawerToggleHandler} />
                <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.showSideDrawer} 
                            onBackdropClosed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);