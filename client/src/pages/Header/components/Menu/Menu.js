import React from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux';


import {logout} from '../../../../redux/auth-reducer'
import { Link } from 'react-router-dom'

import "./menu.scss"

export const Menu = ({active, setActive}) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);

  return (
    <>
    <div style={ !active ? {display: "none"} : {left: "flex"}} className="shadow" onClick={() =>setActive(!active)}>
      
    </div>
    <div  style={ !active ? {left: "8000px"} : {left: "70%"}} className="menu-block">
        <ul className="menu-nav">
          <Link className="menu-nav-link" to="/main">Main</Link>
          <Link className="menu-nav-link" to="/games">Games</Link>
          <Link className="menu-nav-link" to="/settings">Settings</Link>
          <Link style={isAuthenticated ? {opacity: "1"} : {opacity: "0.4"}} className="menu-nav-link" to="/dictionary">Dictionary</Link>
          <Link style={isAuthenticated ? {opacity: "1"} : {opacity: "0.4"}} className="menu-nav-link" to="/statistic">Statistics</Link>
          { isAuthenticated ? <Link onClick={() => dispatch(logout())} className="menu-nav-link" to="/promo">Logout</Link> : <Link className="menu-nav-link" to="/login">Sign In</Link> }
          
        </ul>
      </div>
    </>
  )
}