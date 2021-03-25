import React from 'react';
import { NavLink } from 'react-router-dom';

import { useHttp } from '../../hooks/http.hook'
export const Main = () => {

  const { request } = useHttp()
  const fetch = async () => {
    const fetched = await request('https://rs-lang-api.herokuapp.com/words', 'GET')
    console.log(fetched)
  }
  return (
    <div>
      <h1> Main page</h1>
      <button onClick={() => fetch()}>click</button>
      <NavLink to='/settings'>Settings</NavLink>
      <NavLink to='/statistic'> Statistic </NavLink>
    </div>
  )
}