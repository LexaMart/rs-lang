import React from 'react';

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
    </div>
  )
}