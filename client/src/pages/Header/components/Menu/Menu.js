import React from 'react'
import { Link } from 'react-router-dom'

import "./menu.scss"

export const Menu = ({active, setActive}) => {
  return (
    <>
    <div className="shadow" onClick={() =>setActive(!active)}>
      <div className="menu-block">
        <ul className="menu-nav">
          <Link className="menu-nav-link" to="/main">Main</Link>
          <Link className="menu-nav-link" to="/settings">Settings</Link>
          <Link className="menu-nav-link" to="/statistic">Statistics</Link>
          <Link className="menu-nav-link" to="/dictionary">Dictionary</Link>
          <Link className="menu-nav-link" to="/games">Games</Link>
        </ul>
      </div>
    </div>
    </>
  )
}