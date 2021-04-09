import React from 'react';
import { NavLink } from 'react-router-dom';

import 'materialize-css';
import '../pages/MainPage/popup.scss';

const Popup = ({ active, setActive, text, page, language = 'en' }) => {
  const addClassNameContainer = page === 'statistic' ? 'statistic' : null;
  return (
    <div
      className={active ? 'popup popup_active' : 'popup'}
      // onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? `popup_content popup_active ${addClassNameContainer}`
            : `popup_content ${addClassNameContainer}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="word_tex popup__title">{text}</div>
        <div className="info_container">
          <div className="text_container">
            <div className="text_meaning popup__description">
              {language === 'en'
                ? 'Go to main or to games'
                : 'Перейдите на главную страницу или к играм'}
            </div>
          </div>
        </div>
        <div className="button_container">
          <NavLink className="btn" to="/main">
            {language === 'en' ? 'Main' : 'Главная'}
          </NavLink>
          <NavLink className="btn" to="/games">
            {language === 'en' ? 'Games' : 'Игры'}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Popup;
