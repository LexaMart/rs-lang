import React, { useState, useEffect, useCallback } from 'react';
import { useHttp } from '../../../hooks/http.hook';

import urls from '../../../assets/constants/ursl'
import './myGame.scss';
import { Rules } from './components/Rules';

export const MyGame = () => {
  const { request } = useHttp()
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [randomInt, setRandomInt] = useState([null, null])
  const [winingCard, setWiningCard] = useState(null)
  const [gameCards, setGameCards] = useState([])
  const [lives, setLives] = useState([])

  const startGame = async () => {
    setLives([1, 1, 1, 1])
    setIsGameStarted(true)
    setRandomInt([Math.floor(Math.random() * 6), Math.floor(Math.random() * 29)])
  }
  const choiceHandler = (e) => {
    console.log(e.target.src)
    console.log(`${urls.API}/${winingCard.image}`)
    if (e.target.src === `${urls.API}/${winingCard.image}`) {
      console.log("WIN")
      // setIsGameStarted(false)
      setRandomInt([Math.floor(Math.random() * 6), Math.floor(Math.random() * 29)])
    }
    else {
      if (lives.length === 0) {
        setIsGameLost(true)
        setIsGameStarted(false)
      }
      console.log(lives)
      setLives(lives.splice(0, (lives.length - 1)))
      console.log(lives)
    }
  }
  useEffect(useCallback(async () => {
    console.log(gameCards)
    if (isGameStarted) {
      const arrayToPlay = [];
      // setRandomInt([Math.floor(Math.random() * 6), Math.floor(Math.random() * 29)])
      // const randCard = Math.floor(Math.random() * 6);
      // const randPage = Math.floor(Math.random() * 29)
      const cards = await request(`${urls.API}/words?group=${randomInt[0]}&page=${randomInt[1]}`, "GET")
      for (let i = 0; i <= 3; i++) {
        let randChoice = (Math.floor(Math.random() * (cards.length - 1)))
        arrayToPlay.push(cards[randChoice]);
        cards.splice(randChoice, 1);
      }
      console.log(arrayToPlay)
      setGameCards(arrayToPlay)
      setWiningCard(arrayToPlay[Math.floor(Math.random() * 4)])

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