import React from 'react';
import { NavLink } from 'react-router-dom';

export const Games = () => {
  return (
    <div>
      <h1> Games page</h1>
      <NavLink to='/savannah' >Savannah </NavLink>
    </div>
  )
}