import React from 'react';
import { NavLink } from 'react-router-dom';

import savannah from '../../assets/images/lion.svg';
import audio from '../../assets/images/audio.svg';
import joystick from '../../assets/images/joystick.svg';
import sprint from '../../assets/images/sprint.svg';



import './games.scss';

export const Games = () => {
  return (
    <div className="games-block">
      <NavLink  className="game-card" to='/savannah'>
        <img className="game-icon" src={savannah} alt="savannah" />
        <span className="game-name">Savannah</span>
      </NavLink>
      <NavLink to="/savannah" className="game-card">
        <img className="game-icon" src={audio} alt="audio" />
        <span className="game-name">Auido game</span>
      </NavLink>
      <NavLink to="/mygame" className="game-card">
        <img className="game-icon" src={joystick} alt="my_game" />
        <span className="game-name">Our game</span>
      </NavLink>
      <NavLink to="/sprint" className="game-card">
        <img className="game-icon" src={sprint} alt="sprint" />
        <span className="game-name">Sprint</span>
      </NavLink>
    </div>
  )
}