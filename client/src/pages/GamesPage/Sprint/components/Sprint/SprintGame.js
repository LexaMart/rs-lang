import React, { useEffect, useState } from 'react'

import {useKey} from '../../../../../hooks/keyboardEvents.hook'

import arrow from '../../../../../assets/images/left.svg'

import './sprintGame.scss'

export const SprintGame = ({ gameArr, score, setScore }) => {
  const [rand, setRand] = useState(Math.floor(Math.random() * (gameArr.length - 1)))
  const [toChoose, setToChoose] = useState([null, null])
  const [isCorrect, setIsCorrect] = useState(null)
  const [seria, setSeria] = useState(0)

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
      setSeria(seria + 1)
      if (seria / 4 >= 1) {
        setScore(score +(20 * (Math.floor(seria / 4) + 1)))
      }else setScore(score + 20 )
    } else {
      setSeria(0)
      setScore(score - 10)
    }
    setRand(Math.floor(Math.random() * (gameArr.length - 1)));
  }
  useKey("ArrowRight", () => choiceHandler(true))
  useKey("ArrowLeft", () => choiceHandler(false))
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
        <div className="buttons-image-handler">
          <img className="button-image" src={arrow} alt="btn img" />
          <img className="button-image reverse" src={arrow} alt="btn img" />
        </div>
      </div>
    </div>
  )
}