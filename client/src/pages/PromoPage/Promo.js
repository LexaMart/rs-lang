import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/settings-reducer';

import { Link } from 'react-router-dom';
import statistics from '../../assets/images/statistics.png';
import Settings from '../../assets/images/settings.svg';
import Joystick from '../../assets/images/joystick.svg';
import Audio from '../../assets/images/audio.svg';
import Picture from "../../assets/images/promo_img.png";
import './promo.scss';

export const Promo = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCurrentPage('promo'))
  })
  return (
    <div className="promo_container">
      <div className="caption_promo white-text">Начни изучать английский язык вместе с RS Lang</div>
      <div className="promo_first_block">
        <div className="info_promo">Приложение для изучения иностранных слов с техникой отслеживания индивидуального прогресса, мини-играми и словарем на 3600 слов, для каждого из которых дана его транскрипция, пример применения и многое другое.</div>
        <div><img src={Picture} alt="img" className="head_promo_img" /></div>
      </div>
      <div className="youtube_video_container">
        <iframe classname="youtube_video" width="560" height="315" src="https://www.youtube.com/embed/-043FORA-Gc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div className="feature_card card">
        <div className="feature_info">
          <div className="head_card">Игры</div>
          <div>В нашем приложении доступно 4 игры которые помогут проверить и закрепить изученный материал</div>
        </div>
        <div><img src={Joystick} alt="games" className="feature_img" /></div>
      </div>
      <div className="feature_card card">
        <div className="feature_info">
          <div className="head_card">Статистика</div>
          <div>Просматривай и отслеживай свой прогресс</div>
        </div>
        <div><img src={statistics} alt="statistics" className="feature_img" /></div>
      </div>
      <div className="feature_card card">
        <div className="feature_info">
          <div className="head_card">Настройки сложности</div>
          <div>Настрой под себя сложность выбери с какой группы начать а также показывать ли тебе сложные переводы</div>
        </div>
        <div><img src={Settings} alt="settings" className="feature_img" /></div>
      </div>
      <div className="feature_card card">
        <div className="feature_info">
          <div className="head_card">Произношение</div>
          <div>Прослушивай как правильно произносить слова и тренируйся</div>
        </div>
        <div><img src={Audio} alt="pronounsiation" className="feature_img" /></div>
      </div>
      <div className="info_block_promo card white-text">
        <div className="disadvantages card">
          <div className="disadvantages_title card">
            <div className="title_text">Without registration</div>
          </div>
          <div className="disadvantages_entity card">
            <div className="granted_point">Dictionary of 3600 words</div>
            <div className="granted_point">Pronunciation</div>
            <div className="granted_point">Games</div>
            <div className="granted_point">Settings</div>
            <div className="nongranted_point">Your own dictionary</div>
            <div className="nongranted_point">Your own statistics</div>
          </div>
        </div>
        <div className="advantages card">
          <div className="advantages_title card">
            <div className="title_text">With registration</div>
          </div>
          <div className="advantages_entity card">
            <div className="granted_point">Dictionary of 3600 words</div>
            <div className="granted_point">Pronunciation</div>
            <div className="granted_point">Games</div>
            <div className="granted_point">Settings</div>
            <div className="granted_point">Your own dictionary</div>
            <div className="granted_point">Your own statistics</div>
          </div>
        </div>
      </div>
      <div className="btn_container">
        <Link className="btn sign_in_btn red" to="/login">Войти </Link>
        <Link className="btn sign_in_btn" to="/registration">Регистрация </Link>
      </div>
    </div>
  )
}