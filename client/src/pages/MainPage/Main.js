import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from './../../hooks/http.hook';
import { setCurrentPage, setCurrentWordsGroup, setCurrentWordsPage } from '../../redux/settings-reducer';
import WordCard from './WordCard';
import Popup from './Popup';
import { setIsLoadingInProgress } from '../../redux/auth-reducer';
import { MainPagePreloader } from '../../components/Loader';
import 'materialize-css';
import './Main.scss';

const MAIN_CONSTANTS = {
  groupNum: [0, 1, 2, 3, 4, 5],
  maxPage: 29,
}

export const Main = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.authStore.isLoading);
  const userDeletedWords = useSelector((store) => store.authStore.userDeletedWords);
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
      dispatch(setIsLoadingInProgress(true))
      const fetched = await request(`https://rs-lang-74-api.herokuapp.com/words?group=${currentWordsGroup}&page=${currentWordsPage}`, 'GET')
      setData(fetched);
      dispatch(setIsLoadingInProgress(false))
    } catch (e) { }
  }, [dispatch, request, currentWordsGroup, currentWordsPage])
  useEffect(
    () => {
      dispatch(setCurrentPage('main'))
      getWords();
    }, [dispatch, getWords]);
  const changePage = (incr) => {
    if ((currentWordsPage + incr < 0) || (currentWordsPage + incr > MAIN_CONSTANTS.maxPage)) {
      return;
    }
    dispatch(setCurrentWordsPage(currentWordsPage + incr))
  };

  const changeGroup = (value) => {
    if (currentWordsGroup !== value) {
      dispatch(setCurrentWordsPage(0))
    }
    dispatch(setCurrentWordsGroup(value))
  }
  if (isLoading) {
    return (
      <MainPagePreloader />
    )
  }
  return (
    <div>
      <div className="groups">
        <div className={currentWordsGroup === MAIN_CONSTANTS.groupNum[0] ? "btn group group_1" : "btn group"} onClick={() => changeGroup(MAIN_CONSTANTS.groupNum[0])}>Группа 1</div>
        <div className={currentWordsGroup === MAIN_CONSTANTS.groupNum[1] ? "btn group group_2" : "btn group"} onClick={() => changeGroup(MAIN_CONSTANTS.groupNum[1])}>Группа 2</div>
        <div className={currentWordsGroup === MAIN_CONSTANTS.groupNum[2] ? "btn group group_3" : "btn group"} onClick={() => changeGroup(MAIN_CONSTANTS.groupNum[2])}>Группа 3</div>
        <div className={currentWordsGroup === MAIN_CONSTANTS.groupNum[3] ? "btn group group_4" : "btn group"} onClick={() => changeGroup(MAIN_CONSTANTS.groupNum[3])}>Группа 4</div>
        <div className={currentWordsGroup === MAIN_CONSTANTS.groupNum[4] ? "btn group group_5" : "btn group"} onClick={() => changeGroup(MAIN_CONSTANTS.groupNum[4])}>Группа 5</div>
        <div className={currentWordsGroup === MAIN_CONSTANTS.groupNum[5] ? "btn group group_6" : "btn group"} onClick={() => changeGroup(MAIN_CONSTANTS.groupNum[5])}>Группа 6</div>
      </div>
      <div className="word_container">
        {
          // eslint-disable-next-line array-callback-return
          data && data.map((el) => {
            if (!userDeletedWords.includes(el.id)) {
              return (
                <div onClick={() => {
                  setCurrWord(el);
                  setModalActive(true);
                }}
                  key={el.id}
                >
                  <WordCard element={el} />
                </div>
              )
            }
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
