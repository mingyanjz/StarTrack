import React, { Component } from 'react';
import starlinklogo from '../assets/images/Starlink_Logo.svg'
class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={starlinklogo} className="App-logo" alt="logo"></img>
                <p className="title">StarLink Tracker</p>
            </header>
        )
    };
}

export default Header;