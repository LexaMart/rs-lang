import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from './../../hooks/http.hook';
import { setCurrentPage, setCurrentWordsGroup, setCurrentWordsPage } from '../../redux/settings-reducer';
import WordCard from './WordCard';
import Popup from './Popup';
import 'materialize-css';
import './Main.scss';

export const Main = () => {
  const dispatch = useDispatch()
  // const [group, setGroup] = useState(0);
  // const [page, setPage] = useState(0);
  const currentWordsGroup = useSelector(
    (store) => store.settingsStore.currentWordsGroup
    );
    const currentWordsPage = useSelector(
      (store) => store.settingsStore.currentWordsPage
    );
  const { request } = useHttp();
  const [data, setData] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [currWord, setCurrWord] = useState({ word: "", textMeaning: "", textExample: "" });
  const getWords = useCallback(async () => {
    try {
      const fetched = await request(`https://rs-lang-74-api.herokuapp.com/words?group=${currentWordsGroup}&page=${currentWordsPage}`, 'GET')
      setData(fetched);
    } catch (e) { }
  }, [request, currentWordsGroup, currentWordsPage])
  useEffect(
    () => {
      dispatch(setCurrentPage('main'))
      getWords();
    }, [getWords]);
  const changePage = (incr) => {
    //TODO Magic numbers
    if ((currentWordsPage + incr < 0) || (currentWordsPage + incr > 29)) {
      return;
    }
    // setPage(page + incr);
    dispatch(setCurrentWordsPage(currentWordsPage + incr))
  };

  const changeGroup = (value) => {
    if (currentWordsGroup !== value) {
      // setPage(0);
      dispatch(setCurrentWordsPage(0))
    }
    // setGroup(value);
    dispatch(setCurrentWordsGroup(value))
  }
  return (
    <div>
      <div className="groups">
        <div className={currentWordsGroup === 0 ? "btn group group_1" : "btn group"} onClick={() => changeGroup(0)}>Группа 1</div>
        <div className={currentWordsGroup === 1 ? "btn group group_2" : "btn group"} onClick={() => changeGroup(1)}>Группа 2</div>
        <div className={currentWordsGroup === 2 ? "btn group group_3" : "btn group"} onClick={() => changeGroup(2)}>Группа 3</div>
        <div className={currentWordsGroup === 3 ? "btn group group_4" : "btn group"} onClick={() => changeGroup(3)}>Группа 4</div>
        <div className={currentWordsGroup === 4 ? "btn group group_5" : "btn group"} onClick={() => changeGroup(4)}>Группа 5</div>
        <div className={currentWordsGroup === 5 ? "btn group group_6" : "btn group"} onClick={() => changeGroup(5)}>Группа 6</div>
      </div>
      <div className="word_container">
        {
          data && data.map((el) => {
            return (
              <div onClick={() => {
                setCurrWord(el);
                setModalActive(true);
              }}>
                <WordCard element={el} />
              </div>
            )
          })}
      </div>
      <div className="navigation">
        <i id="arrow" className="material-icons white-text btn" onClick={() => changePage(-1)}>keyboard_arrow_left</i>
        <div className="page_number white-text">{currentWordsPage + 1}</div>
        <i id="arrow" className="material-icons white-text btn" onClick={() => changePage(1)}>keyboard_arrow_right</i>
      </div>
      <Popup active={modalActive} setActive={setModalActive} currElement={currWord} />
    </div>
  );
};
