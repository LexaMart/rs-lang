import React, { useEffect, useState } from 'react';

import './sprintGame.scss'

export const SprintGame = ({ gameArr }) => {
  const [rand, setRand] = useState(Math.floor(Math.random() * (gameArr.length - 1)))
  const [toChoose, setToChoose] = useState([null, null])
  const [isCorrect, setIsCorrect] = useState(null)

  useEffect(()=> {
    console.log(gameArr.length)
    const randIncorrect = (gameArr.length - 1) - rand
    const isCorrectRand = Math.random() > 0.5 
    setIsCorrect(isCorrectRand)
    if (isCorrectRand) {
      setToChoose([gameArr[rand].word, gameArr[rand].wordTranslate])
    }
    else {
      setToChoose([gameArr[rand].word, gameArr[randIncorrect].wordTranslate])
    }
  },[rand, gameArr])

  const choiceHandler = (answer) => {
    if (answer === isCorrect) {
      console.log('win')
    } else {
      console.log("lox")
    }
    setRand(Math.floor(Math.random() * (gameArr.length - 1)));

  }
  return (
    
    <div className="game-block">
      <div className="sprint-card">
        <div className="answers-handler">
          correct or incorrect
        </div>
        <div className="word-to-guess">
          <p className="english">{toChoose[0]}</p>
          <p className="russian">{toChoose[1]}</p>
        </div>
        <div className="buttons-handler">
          <button onClick={() => choiceHandler(true)} className="right">YES</button>
          <button onClick={() => choiceHandler(false)} className="incorrect">NO</button>
        </div>
      </div>
    </div>
  )
}