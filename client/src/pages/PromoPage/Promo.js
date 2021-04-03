import React from 'react';
import { Link } from 'react-router-dom';
import Lion from '../../assets/images/lion.svg';
import Sprint from '../../assets/images/sprint.svg';
import Joystick from '../../assets/images/joystick.svg';
import Audio from '../../assets/images/audio.svg';
import './promo.scss';

export const Promo = () => {
  return (
    <div className="promo_container">
      <div>
        <h3 className="white-text center">Начни изучать английский язык вместе с RS Lang</h3>
        <div className="feature_card card">
          <div className="head_card">Игры</div>
          <div>В нашем приложении доступно 4 игры которые помогут проверить и закрепить изученный материал</div>
        </div>
        <div className="feature_card card">
          <div className="head_card">Статистика</div>
          <div>Просматривай и отслеживай свой прогресс</div>
        </div>
        <div className="feature_card card">
          <div className="head_card">Настройки сложности</div>
          <div>Настрой под себя сложность выбери с какой группы начать а также показывать ли тебе сложные переводы</div>
        </div>
        <div className="feature_card card">
          <div className="head_card">Произношение</div>
          <div>Прослушивай как правильно произносить слова и тренируйся</div>
        </div>
      </div>
      <div className="btn_container">
        <Link className="btn sign_in_btn" to="/login">Войти </Link>
        <Link className="btn" to="/registration">Регистрация </Link>
      </div>

    </div>
  )
}