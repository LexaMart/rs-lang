import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/settings-reducer';
import { LANGUAGE_CONFIG, WORDS_CONFIG } from '../../shared/words-config';
import TeamsInfo from './Components/TeamInfo';

import { Link } from 'react-router-dom';
import statistics from '../../assets/images/statistics.png';
import Settings from '../../assets/images/settings.svg';
import Joystick from '../../assets/images/joystick.svg';
import Audio from '../../assets/images/audio.svg';
import Picture from '../../assets/images/promo_img.png';
import './promo.scss';

export const Promo = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.settingsStore.activeLanguage);

  useEffect(() => {
    dispatch(setCurrentPage('promo'));
  });
  return (
    <div className="promo_container">
      <div className="caption_promo white-text">
        {language === LANGUAGE_CONFIG.foreign
          ? WORDS_CONFIG.PROMO_PAGE_CAPTION.foreign
          : WORDS_CONFIG.PROMO_PAGE_CAPTION.native}
      </div>
      <div className="promo_first_block">
        <div className="info_promo">
          {language === LANGUAGE_CONFIG.foreign
            ? WORDS_CONFIG.PROMO_PAGE_INFO.foreign
            : WORDS_CONFIG.PROMO_PAGE_INFO.native}
        </div>
        <div>
          <img src={Picture} alt="img" className="head_promo_img" />
        </div>
      </div>
      <div className="youtube_video_container">
        <iframe
          className="youtube_video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/PrLlIrSyhV8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="feature_card card">
        <div className="feature_info">
          <div className="head_card">
            {language === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.GAMES_PAGE.foreign
              : WORDS_CONFIG.GAMES_PAGE.native}
          </div>
          <div>
            {language === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.PROMO_PAGE_GAMES_INFO.foreign
              : WORDS_CONFIG.PROMO_PAGE_GAMES_INFO.native}
          </div>
        </div>
        <div>
          <img src={Joystick} alt="games" className="feature_img" />
        </div>
      </div>
      <div className="feature_card card">
        <div className="feature_info">
          <div className="head_card">
            {language === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.STATISTICS_PAGE.foreign
              : WORDS_CONFIG.STATISTICS_PAGE.native}
          </div>
          <div>
            {language === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.PROMO_PAGE_STATISTICS_INFO.foreign
              : WORDS_CONFIG.PROMO_PAGE_STATISTICS_INFO.native}
          </div>
        </div>
        <div>
          <img src={statistics} alt="statistics" className="feature_img" />
        </div>
      </div>
      <div className="feature_card card">
        <div className="feature_info">
          <div className="head_card">
            {language === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.PROMO_PAGE_SETTINGS.foreign
              : WORDS_CONFIG.PROMO_PAGE_SETTINGS.native}
          </div>
          <div>
            {language === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.PROMO_PAGE_SETTINGS_INFO.foreign
              : WORDS_CONFIG.PROMO_PAGE_SETTINGS_INFO.native}
          </div>
        </div>
        <div>
          <img src={Settings} alt="settings" className="feature_img" />
        </div>
      </div>
      <div className="feature_card card">
        <div className="feature_info">
          <div className="head_card">
            {language === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.PROMO_PAGE_PRONUNCIATION.foreign
              : WORDS_CONFIG.PROMO_PAGE_PRONUNCIATION.native}
          </div>
          <div>
            {language === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.PROMO_PAGE_PRONUNCIATION_INFO.foreign
              : WORDS_CONFIG.PROMO_PAGE_PRONUNCIATION_INFO.native}
          </div>
        </div>
        <div>
          <img src={Audio} alt="pronounsiation" className="feature_img" />
        </div>
      </div>
      <div className="info_block_promo card white-text">
        <div className="disadvantages card">
          <div className="disadvantages_title card">
            <div className="title_text">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PROMO_PAGE_BLOCK.foreign.without
                : WORDS_CONFIG.PROMO_PAGE_BLOCK.native.without}
            </div>
          </div>
          <div className="disadvantages_entity card">
            <div className="granted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PROMO_PAGE_BLOCK.foreign.words
                : WORDS_CONFIG.PROMO_PAGE_BLOCK.native.words}
            </div>
            <div className="granted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PROMO_PAGE_PRONUNCIATION.foreign
                : WORDS_CONFIG.PROMO_PAGE_PRONUNCIATION.native}
            </div>
            <div className="granted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.GAMES_PAGE.foreign
                : WORDS_CONFIG.GAMES_PAGE.native}
            </div>
            <div className="granted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.SETTINGS.foreign
                : WORDS_CONFIG.SETTINGS.native}
            </div>
            <div className="nongranted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PROMO_PAGE_BLOCK.foreign.dictionary
                : WORDS_CONFIG.PROMO_PAGE_BLOCK.native.dictionary}
            </div>
            <div className="nongranted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PROMO_PAGE_BLOCK.foreign.statistic
                : WORDS_CONFIG.PROMO_PAGE_BLOCK.native.statistic}
            </div>
          </div>
        </div>
        <div className="advantages card">
          <div className="advantages_title card">
            <div className="title_text">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PROMO_PAGE_BLOCK.foreign.with
                : WORDS_CONFIG.PROMO_PAGE_BLOCK.native.with}
            </div>
          </div>
          <div className="advantages_entity card">
            <div className="granted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PROMO_PAGE_BLOCK.foreign.words
                : WORDS_CONFIG.PROMO_PAGE_BLOCK.native.words}
            </div>
            <div className="granted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PROMO_PAGE_PRONUNCIATION.foreign
                : WORDS_CONFIG.PROMO_PAGE_PRONUNCIATION.native}
            </div>
            <div className="granted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.GAMES_PAGE.foreign
                : WORDS_CONFIG.GAMES_PAGE.native}
            </div>
            <div className="granted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.SETTINGS.foreign
                : WORDS_CONFIG.SETTINGS.native}
            </div>
            <div className="granted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PROMO_PAGE_BLOCK.foreign.dictionary
                : WORDS_CONFIG.PROMO_PAGE_BLOCK.native.dictionary}
            </div>
            <div className="granted_point">
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PROMO_PAGE_BLOCK.foreign.statistic
                : WORDS_CONFIG.PROMO_PAGE_BLOCK.native.statistic}
            </div>
          </div>
        </div>
      </div>
      <div className="btn_container">
        <Link className="btn sign_in_btn red" to="/login">
          {language === LANGUAGE_CONFIG.foreign
            ? WORDS_CONFIG.LOGIN_BUTTON.foreign
            : WORDS_CONFIG.LOGIN_BUTTON.native}{' '}
        </Link>
        <Link className="btn sign_in_btn" to="/registration">
          {language === LANGUAGE_CONFIG.foreign
            ? WORDS_CONFIG.REGISTER_BUTTON.foreign
            : WORDS_CONFIG.REGISTER_BUTTON.native}{' '}
        </Link>
      </div>
      <TeamsInfo language={language} />
    </div>
  );
};
