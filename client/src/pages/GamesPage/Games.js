import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/settings-reducer';

import savannah from '../../assets/images/lion.svg';
import audio from '../../assets/images/audio.svg';
import joystick from '../../assets/images/joystick.svg';
import sprint from '../../assets/images/sprint.svg';
import './games.scss';
import {
  CURRENT_PAGE_NAME,
  LANGUAGE_CONFIG,
  WORDS_CONFIG,
} from '../../shared/words-config';

export const Games = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.settingsStore.activeLanguage);

  useEffect(() => {
    dispatch(setCurrentPage(CURRENT_PAGE_NAME.GAMES));
  });

  return (
    <div className="games-block">
      <NavLink className="game-card" to="/savannah">
        <img className="game-icon" src={savannah} alt="savannah" />
        <span className="game-name">
          {language === LANGUAGE_CONFIG.foreign ? 'Savannah' : 'Саванна'}
        </span>
      </NavLink>
      <NavLink to="/audiocall" className="game-card">
        <img className="game-icon" src={audio} alt="audio" />
        <span className="game-name">
          {language === LANGUAGE_CONFIG.foreign ? 'Audio game' : 'Аудио игра'}
        </span>
      </NavLink>
      <NavLink to="/mygame" className="game-card">
        <img className="game-icon" src={joystick} alt="my_game" />
        <span className="game-name">
          {language === LANGUAGE_CONFIG.foreign ? 'Our game' : 'Наша игра'}
        </span>
      </NavLink>
      <NavLink to="/sprint" className="game-card">
        <img className="game-icon" src={sprint} alt="sprint" />
        <span className="game-name">
          {language === LANGUAGE_CONFIG.foreign ? 'Sprint' : 'Спринт'}
        </span>
      </NavLink>
    </div>
  );
};
