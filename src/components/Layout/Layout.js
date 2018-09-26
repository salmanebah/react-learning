import React, {Component} from "react";
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

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

    sideDrawerTogglerHandler = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer});
    }
    
    render() { 
        return (
            <Aux>
                <Toolbar onDrawerToggle={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} onBackdropClosed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

export default Layout;