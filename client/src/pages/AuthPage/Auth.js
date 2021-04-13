import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { login } from '../../redux/auth-reducer';
import { setCurrentPage } from '../../redux/settings-reducer';
import { LANGUAGE_CONFIG, WORDS_CONFIG } from '../../shared/words-config';

import './auth.scss';

export const Auth = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const message = useSelector((store) => store.authStore.authMessage);
  const [authMessage, setAuthMessage] = useState(null);
  const isLoading = useSelector((store) => store.authStore.isLoading);
  const language = useSelector((store) => store.settingsStore.activeLanguage);
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = () => {
    dispatch(login(form.email, form.password));
  };
  useEffect(() => {
    language === LANGUAGE_CONFIG.foreign
      ? setAuthMessage(WORDS_CONFIG.AUTH_ERROR.foreign)
      : setAuthMessage(WORDS_CONFIG.AUTH_ERROR.native);
    if (message) window.M.toast({ html: authMessage, displayLength: 1000 });
    dispatch(setCurrentPage(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
  return (
    <div className="row auth_container">
      <div id="sign_in_form" className="col s6 offset-s3">
        <div className="card auth_card">
          <div className="card-content white-text">
            <span className="card-title" style={{ textAlign: 'center' }}>
              {' '}
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PAGE_REGISTRATION.foreign.signin
                : WORDS_CONFIG.PAGE_REGISTRATION.native.signin}
            </span>
          </div>
          <div className="card-auth-inputs">
            <div className="row"></div>
            <div className="row">
              <div className="input-field input-auth-field col s12">
                <input
                  onChange={changeHandler}
                  name="email"
                  id="email"
                  type="email"
                  className="validate"
                  placeholder={
                    language === LANGUAGE_CONFIG.foreign
                      ? WORDS_CONFIG.PAGE_REGISTRATION.foreign.placeholderEmail
                      : WORDS_CONFIG.PAGE_REGISTRATION.native.placeholderEmail
                  }
                />
                <label htmlFor="email" className="active">
                  {' '}
                  {language === LANGUAGE_CONFIG.foreign
                    ? WORDS_CONFIG.PAGE_REGISTRATION.foreign.email
                    : WORDS_CONFIG.PAGE_REGISTRATION.native.email}
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field input-auth-field col s12">
                <input
                  onChange={changeHandler}
                  name="password"
                  id="password"
                  type="password"
                  className="validate"
                  placeholder={
                    language === LANGUAGE_CONFIG.foreign
                      ? WORDS_CONFIG.PAGE_REGISTRATION.foreign
                          .placeholderPassword
                      : WORDS_CONFIG.PAGE_REGISTRATION.native
                          .placeholderPassword
                  }
                />
                <label htmlFor="password" className="active">
                  {' '}
                  {language === LANGUAGE_CONFIG.foreign
                    ? WORDS_CONFIG.PAGE_REGISTRATION.foreign.password
                    : WORDS_CONFIG.PAGE_REGISTRATION.native.password}
                </label>
              </div>
            </div>
          </div>
          <div className="sign_in_btn_area">
            <button
              onClick={loginHandler}
              disabled={isLoading}
              className="btn waves-effect red waves-light"
              type="submit"
              name="action"
            >
              {' '}
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PAGE_REGISTRATION.foreign.signin
                : WORDS_CONFIG.PAGE_REGISTRATION.native.signin}
              !<i className="material-icons right">send</i>
            </button>
          </div>
          <div className="link-block">
            <NavLink className="btn sign_in_button" to="/registration">
              {' '}
              {language === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.PAGE_REGISTRATION.foreign.signup
                : WORDS_CONFIG.PAGE_REGISTRATION.native.signup}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
