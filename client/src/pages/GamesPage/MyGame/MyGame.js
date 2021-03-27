import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHttp } from '../../../hooks/http.hook';

import urls from '../../../assets/constants/ursl'
import './myGame.scss';
import { Rules } from './components/Rules';

export const MyGame = () => {
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const { request } = useHttp()
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [randomInt, setRandomInt] = useState([null, null])
  const [winingCard, setWiningCard] = useState(null)
  const [gameCards, setGameCards] = useState([])
  const [lives, setLives] = useState([])
  const [isFirtsTry, setFirstTry] = useState(true);

  const startGame = async () => {
    setLives([1, 1, 1, 1])
    setIsGameStarted(true)
    setRandomInt([Math.floor(Math.random() * 6), Math.floor(Math.random() * 29)])
  }
  const choiceHandler = async (e) => {
    if (e.target.src === `${urls.API}/${winingCard.image}`) {
      console.log("WIN")
      if (isFirtsTry) {
        await request(`${urls.API}/users/${userId}/words/${winingCard.id}`, "POST", {
          "difficulty": "learned",
        }, {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })
      }
      setRandomInt([Math.floor(Math.random() * 6), Math.floor(Math.random() * 29)])
    }
    else {
      if (lives.length === 0) {
        setIsGameLost(true)
        setIsGameStarted(false)
      }
      setFirstTry(false);
      setLives(lives.splice(0, (lives.length - 1)))
    }
  }
  useEffect(useCallback(async () => {
    if (isGameStarted) {
      const arrayToPlay = [];
      const cards = await request(`${urls.API}/words?group=${randomInt[0]}&page=${randomInt[1]}`, "GET")
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
      {
        !isGameStarted && !isGameLost &&
        <Rules startGame={startGame} />
      }
      {
        isGameLost &&
        <>Lost</>
      }
      {isGameStarted && winingCard &&
        <div className="word-to-guess-block">
          <span className="guess-word">{winingCard.word}</span>
          <span className="lives">{lives.map(el => `X`)}</span>
          <div className="image-handler">
            {gameCards.map((el, key) => <div onClick={(el) => choiceHandler(el)} className="my-game-word-image" key={key}><img src={`${urls.API}/${el.image}`} alt="word_image" /></div>)}
          </div>
        </div>
      }

    </div>
  )
}