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
          <Link className="menu-nav-link" to="/main" onClick={() => setActive(!active)}>Main</Link>
          <Link className="menu-nav-link" to="/settings" onClick={() => setActive(!active)}>Settings</Link>
          <Link className="menu-nav-link" to="/statistic" onClick={() => setActive(!active)}>Statistics</Link>
          <Link className="menu-nav-link" to="/dictionary" onClick={() => setActive(!active)}>Dictionary</Link>
          <Link className="menu-nav-link" to="/games" onClick={() => setActive(!active)}>Games</Link>
        </ul>
      </div>
    </>
  )
}