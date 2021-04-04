import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from './components/Menu/Menu';
import 'materialize-css';
import './header.scss';
import Lion from '../../assets/images/lion.svg';
import Sprint from '../../assets/images/sprint.svg';
import Joystick from '../../assets/images/joystick.svg';
import Audio from '../../assets/images/audio.svg';
import burger from "../../assets/images/menu.svg"

const Header = () => {
    const [burgerActive, setBurgerActive] = useState(false);

    return (
        <>
            <div className="header_container">
                <a href="/main" className="white-text app_logo">RS Lang</a>
                <div className="game_links_container">
                    <NavLink className="link_container" to="/savannah"><img className="game_link" src={Lion} alt="savannah" /></NavLink>
                    <NavLink className="link_container" to="/audiocall"><img className="game_link" src={Audio} alt="audio" /></NavLink>
                    <NavLink className="link_container" to="/mygame"><img className="game_link" src={Joystick} alt="ourgame" /></NavLink>
                    <NavLink className="link_container" to="/sprint"><img className="game_link" src={Sprint} alt="sprint" /></NavLink>
                </div>
                <div className={`burger-block ${burgerActive ? "bg-active" : ""}`}>
                    <img onClick={() => setBurgerActive(!burgerActive)} className="burger-image" src={burger} alt="burger" />
                </div>
            </div>
            <Menu active={burgerActive} setActive={setBurgerActive} />

        </>
    )
}

export default Header;