import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHttp } from '../../../../../hooks/http.hook'
import { useKey } from '../../../../../hooks/keyboardEvents.hook'
import arrow from '../../../../../assets/images/left.svg'
import { rsLangApi } from '../../../../../services/rs-lang-api'
import './sprintGame.scss'
import { scoreHandler } from '../Score/Score'
import { constants } from '../Timer/Timer'




export const SprintGame = ({ numberOfLearned, setNumberOfLearned, numberOfIncorrect, setNumberOfIncorrect, gameArr, score, setScore }) => {
  const token = useSelector((store) => store.authStore.userData.token)
  const userId = useSelector((store) => store.authStore.userData.userId)
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const { request } = useHttp()
  const [rand, setRand] = useState(Math.floor(Math.random() * (gameArr.length - 1)))
  const [winId, setWinId] = useState(null);
  const [toChoose, setToChoose] = useState([null, null])
  const [isCorrect, setIsCorrect] = useState(null)
  const [seria, setSeria] = useState(0)

  useEffect(() => {
    console.log(gameArr.length)
    const randIncorrect = (gameArr.length - constants.one) - rand
    const isCorrectRand = Math.random() > 0.5
    setIsCorrect(isCorrectRand)
    if (isCorrectRand) {
      setToChoose([gameArr[rand].word, gameArr[rand].wordTranslate])
    }
    else {
      setToChoose([gameArr[rand].word, gameArr[randIncorrect].wordTranslate])
    }
    setWinId(gameArr[rand].id)
  }, [rand, gameArr])

  const choiceHandler = (answer) => {
    if (answer === isCorrect) {
      scoreHandler(true)
      if (seria / constants.seria >= constants.one) {
        setScore(score + (constants.scorePlus * (Math.floor(seria / constants.seria) + constants.one)))
      } else {
        setScore(score + constants.scorePlus)
      }
      if (isAuthenticated) rsLangApi.postUserWord(token, userId, winId, 'learned')
      setNumberOfLearned(numberOfLearned + constants.one)
    } else {
      if (isAuthenticated) {
        rsLangApi.postUserWord(token, userId, winId, 'hard')
      }
      scoreHandler(false)
      setSeria(0)
      setScore(score - constants.scoreMinus)
      setNumberOfIncorrect(numberOfIncorrect + constants.one)
    }
    setRand(Math.floor(Math.random() * (gameArr.length - constants.one)));
  }
  useKey("ArrowRight", () => choiceHandler(false))
  useKey("ArrowLeft", () => choiceHandler(true))
  return (

    <div className="game-block">
      <div className="sprint-card">
        <div className="answers-handler">
          Correct or Incorrect
        </div>
        <div className="word-to-guess">
          <p className="english">{toChoose[constants.zero]}</p>
          <p className="russian">{toChoose[constants.one]}</p>
        </div>
        <div className="buttons-handler">
          <button onClick={() => choiceHandler(true)} className="btn right">YES</button>
          <button onClick={() => choiceHandler(false)} className="btn red incorrect">NO</button>
        </div>
        {/* <div className="buttons-image-handler">
          <img className="button-image" src={arrow} alt="btn img" />
          <img className="button-image reverse" src={arrow} alt="btn img" />
        </div> */}
      </div>
    </div>
  )
}