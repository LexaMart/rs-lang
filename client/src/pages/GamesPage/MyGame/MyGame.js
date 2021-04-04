import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../../hooks/http.hook';
import { Rules } from './components/Rules';
import { rsLangApi } from '../../../services/rs-lang-api';
import urls from '../../../assets/constants/ursl'
import { setMyGameLearnedWords, setMyGameIncorrectAnswers, getStatistic } from '../../../redux/statistics-reducer'
import { sendStatistic } from '../GameUtilities/GameUtilities'
import './myGame.scss';
import 'materialize-css';

export const MyGame = () => {
  const dispatch = useDispatch()
  const gameDifficult = useSelector((store) => store.settingsStore.gameDifficult)
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
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
      console.log("WIN")
      setNumberOfLearnedWords(numberOfLearnedWords + 1)
      if (isFirtsTry && isAuthenticated) {
        rsLangApi.postUserWord(token, userId, winingCard.id, 'learned')
      }
      setRandomInt([Math.floor(Math.random() * 6), Math.floor(Math.random() * 29)])
    }
    else {
      if (lives.length === 0) {
        setIsGameLost(true)
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
      const arrayToPlay = [];
      const cards = await request(`${urls.API}/words?group=${gameDifficult - 1}&page=${randomInt[0]}`, "GET")
      for (let i = 0; i <= 3; i++) {
        let randChoice = (Math.floor(Math.random() * (cards.length - 1)))
        arrayToPlay.push(cards[randChoice]);
        cards.splice(randChoice, 1);
      }
      setGameCards(arrayToPlay)
      setWiningCard(arrayToPlay[Math.floor(Math.random() * 4)])
      setFirstTry(true)
    }
  }, [isGameStarted, gameCards, request, randomInt]), [isGameStarted, randomInt])
  return (
    <div className="our-game-container">
       <h2>Our game</h2>
       {!isGameStarted && !isGameLost && <p className="rules">In this mini-game you should guess what picture describes the following word</p>}
       {isGameLost && !isGameStarted && <div className="lost-screen">LOST</div>}
       {!isGameStarted && <button className="btn red" onClick={startGame}>{!isGameLost ? "Start" : "Retry"}</button>}
      {/* {
        !isGameStarted && !isGameLost &&
        <Rules startGame={startGame} />
      }
      {
        isGameLost &&
        <>Lost</>
      } */}
      {isGameStarted && winingCard &&
        <div className="word-to-guess-block">
          <span className="guess-word white-text  ">{winingCard.word}</span>
          <div className="lives-container"><div><i className="material-icons">favorite </i> x {lives.length + 1}</div></div>
          <div className="image-handler">
            {gameCards.map((el, key) => <div onClick={(el) => choiceHandler(el)} className="my-game-word-image" key={key}><img src={`${urls.API}/${el.image}`} alt="word_image" /></div>)}
          </div>
        </div>
      }

    </div>
  )
}