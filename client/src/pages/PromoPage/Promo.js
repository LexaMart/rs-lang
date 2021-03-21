import React from 'react';
import { Link } from 'react-router-dom';

export const Promo = () => {
  return (
    <div>
      <h1> Promo</h1>
      <Link to="/login">LOGIN </Link>
      <Link to="/registration">REGIST </Link>
    </div>
  )
}