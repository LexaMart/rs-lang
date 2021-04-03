import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Menu } from './components/Menu/Menu';

import 'materialize-css';
import './header.scss';
import burger from "../../assets/images/menu.svg"

const Header = () => {
    const [burgerActive, setBurgerActive] = useState(false);

    return (
        <>
            <div className="header_container">
                <a href="/main" className="white-text app_logo">RS Lang</a>
                <NavLink to="/games">Play GAMES</NavLink>
                <div className={`burger-block ${burgerActive ? "bg-active" : ""}`}>
                    <img onClick={() => setBurgerActive(!burgerActive)} className="burger-image" src={burger} alt="burger" />
                </div>
            </div>
            <Menu active={burgerActive} setActive={setBurgerActive} />

        </>
    )
}

export default Header;