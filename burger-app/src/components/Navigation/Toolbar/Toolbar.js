import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawToggle/DrawToggle';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle onClick={props.onDrawerToggle} />
        <Logo />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default Toolbar;