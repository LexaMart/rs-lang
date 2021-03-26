import React from 'react';
import 'materialize-css';
import './Header.css';

const Header = () => {
    return (
        <div className="header_container">
            <a href="/main" className="white-text app_logo">RS Lang</a>
            <div>Games</div>
            <div>Menu</div>
        </div>
    )
}

export default Header;