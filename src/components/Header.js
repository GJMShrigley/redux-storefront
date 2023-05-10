import React from 'react';
import Cart from './Cart';
import { Outlet, Link } from "react-router-dom";

function Header() {
return (
    <header className='header'>
        <Cart />
    </header>
)
}

export default Header;
