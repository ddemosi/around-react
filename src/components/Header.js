import React from 'react';
import logo from '../images/logo.svg';

function Header(){
    return(
        <header className="header width">
            <img className="logo" src={logo} alt="Around the US Logo"/>
        </header>
    )
}

export default Header;