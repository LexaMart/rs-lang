import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../../hooks/http.hook';
import { rsLangApi } from '../../../services/rs-lang-api';
import { MAX_NUMBER } from '../Savannah/Savannah';
import urls from '../../../assets/constants/ursl'
import { setMyGameLearnedWords, setMyGameIncorrectAnswers, getStatistic } from '../../../redux/statistics-reducer'
import { playSound, sendStatistic } from '../GameUtilities/GameUtilities'
import { Select } from "react-materialize";
import './myGame.scss';
import 'materialize-css';
import { setIsLoadingInProgress } from '../../../redux/auth-reducer';
import { MainPagePreloader } from '../../../components/Loader';
import { ImageCard } from './components/ImageCard/ImageCard'
import rightSound from '../../../assets/sounds/correct.mp3'
import wrongSound from '../../../assets/sounds/error.mp3'
import looseSound from '../../../assets/sounds/failure.mp3'

export const MyGame = () => {
  const dispatch = useDispatch()
  const levelsArray = [];
  const pagesArray = [];
  for (let i = 0; i < MAX_NUMBER.LEVEL; i++) {
    levelsArray.push(i + 1);
  }
  for (let i = 0; i < MAX_NUMBER.PAGE; i++) {
    pagesArray.push(i + 1);
  }
  const isLoading = useSelector((store) => store.authStore.isLoading)
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const currentPage = useSelector((store) => store.settingsStore.currentPage);

  const currentWordsPage = useSelector(
    (store) => store.settingsStore.currentWordsPage
  );
  const currentWordsGroup = useSelector(
    (store) => store.settingsStore.currentWordsGroup
  );
  const { request } = useHttp()
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [randomInt, setRandomInt] = useState([null, null])
  const [winingCard, setWiningCard] = useState(null)
  const [gameCards, setGameCards] = useState([])
  const [lives, setLives] = useState([])
  const [isFirtsTry, setFirstTry] = useState(true);
  const [numberOfLearnedWords, setNumberOfLearnedWords] = useState(0);
  const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
  const [levelInputValue, setLevelInputText] = useState(1);
  const [pageInputValue, setPageInputText] = useState(1);
  const [score, setScore] = useState(0)

  const optionalStatisticObject = useSelector(
    (store) => store.statisticsStore.statisticsData.optional
  );
  const wholeLearnedWords = useSelector(
    (store) => store.statisticsStore.learnedWords
  );

  

  const startGame = async () => {
    setLives([1, 1, 1, 1])
    setIsGameStarted(true)
    setRandomInt([Math.floor(Math.random() * 29)])
    if (isAuthenticated) dispatch(getStatistic(userId, token))
  }
  const choiceHandler = async (e) => {
    if (e.target.src === `${urls.API}/${winingCard.image}`) {
      playSound(rightSound)
      setScore(score + 1)
      setNumberOfLearnedWords(numberOfLearnedWords + 1)
      if (isFirtsTry && isAuthenticated) {
        rsLangApi.postUserWord(token, userId, winingCard.id, 'learned')
      }
      setRandomInt([Math.floor(Math.random() * 6), Math.floor(Math.random() * 29)])
    }
    else {
      playSound(wrongSound)
      if (lives.length === 0) {
        console.log(e.target)
        e.target.classList.add('choosen')
        setIsGameLost(true)
        playSound(looseSound)
        setIsGameStarted(false)
        dispatch(setMyGameLearnedWords(numberOfLearnedWords))
        dispatch(setMyGameIncorrectAnswers(numberOfIncorrectAnswers))
        sendStatistic(
          isAuthenticated,
          userId,
          token,
          wholeLearnedWords,
          optionalStatisticObject,
          numberOfLearnedWords,
          numberOfIncorrectAnswers
        )
      }
      setFirstTry(false);
      setLives(lives.splice(0, (lives.length - 1)))
      setNumberOfIncorrectAnswers(numberOfIncorrectAnswers + 1)
    }
  }
  useEffect(useCallback(async () => {
    if (isGameStarted) {
      dispatch(setIsLoadingInProgress(true))
      const arrayToPlay = [];
      const cards = await request(`${urls.API}/words?group=${currentPage === 'main' ? currentWordsGroup : levelInputValue - 1}&page=${currentPage === 'main' ? currentWordsPage : pageInputValue - 1}`, "GET")
      for (let i = 0; i <= 3; i++) {
        let randChoice = (Math.floor(Math.random() * (cards.length - 1)))
        arrayToPlay.push(cards[randChoice]);
        cards.splice(randChoice, 1);
      }
      setGameCards(arrayToPlay)
      setWiningCard(arrayToPlay[Math.floor(Math.random() * 4)])
      setFirstTry(true)
      dispatch(setIsLoadingInProgress(false))
    }
  }, [isGameStarted, gameCards, request, levelInputValue, pageInputValue]), [isGameStarted, pageInputValue, levelInputValue, randomInt])

  if (isLoading) {
    return <MainPagePreloader />
  }
  return (
    <div className="our-game-container">
      {!isGameStarted && !isGameLost && <p className="rules">In this mini-game you should guess what picture describes the following word</p>}
      {isGameLost && !isGameStarted && <div className="lost-screen">Game is over your score is <b>{score} </b> </div>}
      {!isGameStarted && currentPage !== 'main' &&
        <>
          <>
            <Select
              id="select-level"
              multiple={false}
              onChange={(event) => setLevelInputText(event.currentTarget.value)}
              value={levelInputValue}
            >
              {levelsArray.map((el) => {
                return <option value={el}>{el}</option>;
              })}
            </Select>
            <Select
              id="select-page"
              multiple={false}
              onChange={(event) => setPageInputText(event.currentTarget.value)}
              value={pageInputValue}
            >
              {pagesArray.map((el) => {
                return <option value={el}>{el}</option>;
              })}
            </Select>
          </>
        </>
      }
      {!isGameStarted && <button className="btn start-our waves-effect waves-light red" type="button" onClick={startGame}>{!isGameLost ? "Start" : "Retry"}</button>}
      {isGameStarted && winingCard &&
        <div className="word-to-guess-block">
          <span className="guess-word white-text  ">{winingCard.word}</span>
          <div className="lives-container"><div><i className="material-icons">favorite </i> x {lives.length + 1}</div></div>
          <div className="image-handler-our">
            {gameCards.map((el, key) => <ImageCard choiceHandler={choiceHandler} key={key} el={el} />)}
          </div>
        </div>
      }

    </div>
  )
}