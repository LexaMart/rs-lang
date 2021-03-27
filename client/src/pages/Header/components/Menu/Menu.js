import React from 'react'
import { Link } from 'react-router-dom'

import "./menu.scss"

export const Menu = ({active, setActive}) => {
  return (
    <>
    <div style={ !active ? {display: "none"} : {left: "flex"}} className="shadow" onClick={() =>setActive(!active)}>
      
    </div>
    <div  style={ !active ? {left: "8000px"} : {left: "70%"}} className="menu-block">
        <ul className="menu-nav">
          <Link className="menu-nav-link" to="/main">Main</Link>
          <Link className="menu-nav-link" to="/settings">Settings</Link>
          <Link className="menu-nav-link" to="/statistic">Statistics</Link>
          <Link className="menu-nav-link" to="/dictionary">Dictionary</Link>
          <Link className="menu-nav-link" to="/games">Games</Link>
        </ul>
      </div>
    </>
  )
}