import React from 'react';

import 'materialize-css';
import '../pages/MainPage/popup.scss';

const Popup = ({ active, setActive, text, page, language = 'en' }) => {
  const addClassNameContainer = page === 'statistic' ? 'statistic' : null;
  return (
    <div
      className={active ? 'popup popup_active' : 'popup'}
      onClick={() => setActive(false)}
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
        <div className="button_container">
          <button onClick={() => setActive(false)} className="btn">
            {language === 'en' ? 'Close' : 'Закрыть'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
