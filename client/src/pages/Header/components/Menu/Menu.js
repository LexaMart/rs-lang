import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { logout } from '../../../../redux/auth-reducer'
import { Link } from 'react-router-dom'
import { LANGUAGE_CONFIG, WORDS_CONFIG } from '../../../../shared/words-config'
import { setCurrentPage } from '../../../../redux/settings-reducer'

import "./menu.scss"
import { UserInfo } from '../UserInfo/UserInfo'

export const Menu = ({ active, setActive }) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const activeLang = useSelector((store) => store.settingsStore.activeLanguage);
  const currentPage = useSelector((store) => store.settingsStore.currentPage);
  
  const menuLinkHandler = () => {
    setActive(!active)
  }

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(setCurrentPage(""))
    setActive(!active)
  }

  return (
    <>
      <div style={!active ? { display: "none" } : { left: "flex" }} className="shadow" onClick={() => setActive(!active)}>

      </div>
      <div style={!active ? { left: "8000px" } : { left: "70%" }} className="menu-block">
        <ul className="menu-nav">
          <Link onClick={() => menuLinkHandler()} className={`menu-nav-link ${currentPage === 'main' ? "active" : ""}`} to="/main">{activeLang === LANGUAGE_CONFIG.foreign ? WORDS_CONFIG.MAIN_PAGE.foreign : WORDS_CONFIG.MAIN_PAGE.native}</Link>
          <Link onClick={() => menuLinkHandler()}  className={`menu-nav-link ${currentPage === 'games' ? "active" : ""}`} to="/games">{activeLang === LANGUAGE_CONFIG.foreign ? WORDS_CONFIG.GAMES_PAGE.foreign : WORDS_CONFIG.GAMES_PAGE.native}</Link>
          <Link onClick={() => menuLinkHandler()}  className={`menu-nav-link ${currentPage === 'settings' ? "active" : ""}`} to="/settings">{activeLang === LANGUAGE_CONFIG.foreign ? WORDS_CONFIG.SETTINGS.foreign : WORDS_CONFIG.SETTINGS.native}</Link>
          <Link onClick={() => menuLinkHandler()} style={isAuthenticated ? { opacity: "1" } : { opacity: "0.4" }}  className={`menu-nav-link ${currentPage === 'dictionary' ? "active" : ""}`} to="/dictionary">{activeLang === LANGUAGE_CONFIG.foreign ? WORDS_CONFIG.DICTIONARY_PAGE.foreign : WORDS_CONFIG.DICTIONARY_PAGE.native}</Link>
          <Link onClick={() => menuLinkHandler()} style={isAuthenticated ? { opacity: "1" } : { opacity: "0.4" }}  className={`menu-nav-link ${currentPage === 'statistic' ? "active" : ""}`} to="/statistic">{activeLang === LANGUAGE_CONFIG.foreign ? WORDS_CONFIG.STATISTICS_PAGE.foreign : WORDS_CONFIG.STATISTICS_PAGE.native}</Link>
          <Link onClick={() => menuLinkHandler()}  className={`menu-nav-link ${currentPage === 'promo' ? "active" : ""}`} to="/promo">{activeLang === LANGUAGE_CONFIG.foreign ? WORDS_CONFIG.PROMO_PAGE.foreign : WORDS_CONFIG.PROMO_PAGE.native}</Link>
          {isAuthenticated ? <Link onClick={() => logoutHandler()} className="menu-nav-link" to="/promo">{activeLang === LANGUAGE_CONFIG.foreign ? WORDS_CONFIG.LOGOUT_BUTTON.foreign : WORDS_CONFIG.LOGOUT_BUTTON.native}</Link> :
            <Link onClick={() => setActive(!active)} className="menu-nav-link" to="/login">{activeLang === LANGUAGE_CONFIG.foreign ? WORDS_CONFIG.LOGIN_BUTTON.foreign : WORDS_CONFIG.LOGIN_BUTTON.native}</Link>}
        </ul>
        {isAuthenticated && <UserInfo />}
      </div>
    </>
  )
}