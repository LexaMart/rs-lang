import React, { useCallback, useEffect, useState } from 'react';
import { useHttp } from './../../hooks/http.hook';
import WordCard from './WordCard';
import 'materialize-css';
import './Main.css';

export const Main = () => {
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const { request } = useHttp();
  const [data, setData] = useState([]);
  const getWords = useCallback(async () => {
    try {
      const fetched = await request(`https://rs-lang-api.herokuapp.com/words?group=${group}&page=${page}`, 'GET')
      setData(fetched);
    } catch (e) { }
  }, [request, group, page])
  useEffect(
    () => {
      getWords();
    }, [getWords]);
  const changePage = (incr) => {
    if((page + incr < 0) || (page + incr > 29)) {
      return;
    }
    setPage(page + incr);
  };

  const changeGroup = (value) => {
    setPage(0);
    setGroup(value);
  }
  return (
    <div>
      <div className="groups">
        <div className="btn group" onClick={() => changeGroup(0)}>Группа 1</div>
        <div className="btn group" onClick={() => changeGroup(1)}>Группа 2</div>
        <div className="btn group" onClick={() => changeGroup(2)}>Группа 3</div>
        <div className="btn group" onClick={() => changeGroup(3)}>Группа 4</div>
        <div className="btn group" onClick={() => changeGroup(4)}>Группа 5</div>
        <div className="btn group" onClick={() => changeGroup(5)}>Группа 6</div>
      </div>
        <div className="word_container">
          {
            data && data.map((el) => {
                return (
                  <WordCard element={el} />
               )
            })}
        </div>
        <div className="navigation">  
          <i id="arrow" className="material-icons white-text btn" onClick={() => changePage(-1)}>keyboard_arrow_left</i>
          <div className="page_number white-text">{page+1}</div>
          <i id="arrow" className="material-icons white-text btn" onClick={() => changePage(1)}>keyboard_arrow_right</i>
        </div>
    </div>
  )
}