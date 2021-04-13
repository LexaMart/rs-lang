import React from 'react';
import { LANGUAGE_CONFIG, WORDS_CONFIG } from '../../../shared/words-config';
import { URL_GIT_AVATAR } from '../../../shared/avatar-config';

const TeamsInfo = (language = 'en') => {
  return (
    <section className="team-info">
      <h3 className="caption_promo white-text">О команде</h3>
      <div className="team-info__list ">
        <div className="feature_card card">
          <div className="feature_info">
            <h4 className="head_card">LexaMart</h4>
            <p>
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.TEAM_INFO_LEXAMART.foreign
                : WORDS_CONFIG.TEAM_INFO_LEXAMART.native}
            </p>
          </div>
          <img
            src={URL_GIT_AVATAR.LEXAMART}
            alt="git"
            className="feature_img"
          />
        </div>
        <div className="feature_card card">
          <div className="feature_info">
            <h4 className="head_card">AnAtoliyAK</h4>
            <p>
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.TEAM_INFO_ANATLIYAK.foreign
                : WORDS_CONFIG.TEAM_INFO_ANATLIYAK.native}
            </p>
          </div>
          <img
            src={URL_GIT_AVATAR.ANATLIYAK}
            alt="git"
            className="feature_img"
          />
        </div>
        <div className="feature_card card">
          <div className="feature_info">
            <h4 className="head_card">Nerbet</h4>
            <p>
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.TEAM_INFO_NERBET.foreign
                : WORDS_CONFIG.TEAM_INFO_NERBET.native}
            </p>
          </div>
          <img src={URL_GIT_AVATAR.NERBET} alt="git" className="feature_img" />
        </div>
        <div className="feature_card card">
          <div className="feature_info">
            <h4 className="head_card">burik84</h4>
            <p>
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.TEAM_INFO_BURIK.foreign
                : WORDS_CONFIG.TEAM_INFO_BURIK.native}
            </p>
          </div>
          <img src={URL_GIT_AVATAR.BURIK} alt="git" className="feature_img" />
        </div>
      </div>
    </section>
  );
};

export default TeamsInfo;
