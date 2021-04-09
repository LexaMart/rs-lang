import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendStatistic } from '../../../GameUtilities/GameUtilities'
import { setSprintLearnedWords, setSprintIncorrectAnswers } from '../../../../../redux/statistics-reducer'
import { sprintStates } from '../../../../../assets/constants/sprintStates';
import './timer.scss';
import { removeGameClasses } from '../Score/Score';

export const constants = {
  timer: 60,
  zero: 0,
  one: 1,
  interval: 1000,
  scorePlus: 20,
  scoreMinus: 10,
  seria: 4,
}

export const Timer = ({ numOfLearned, numOfIncorrect, setIsGameStarted }) => {
  const dispatch = useDispatch()
  const [time, setTime] = useState(constants.timer);
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const optionalStatisticObject = useSelector(
    (store) => store.statisticsStore.statisticsData.optional
  );
  const wholeLearnedWords = useSelector(
    (store) => store.statisticsStore.learnedWords
  );

  const stopGame = () => {
    removeGameClasses()
    dispatch(setSprintLearnedWords(numOfLearned))
    dispatch(setSprintIncorrectAnswers(numOfIncorrect))
    sendStatistic(isAuthenticated, userId, token, wholeLearnedWords, optionalStatisticObject, numOfLearned, numOfIncorrect)
    setIsGameStarted(sprintStates.finished)
  }


  useEffect(() => {
    const interval = setInterval(() => {
      if (time <= constants.zero) {
        stopGame()
        clearInterval(interval)
      }
      setTime(time - 1)
    }, constants.interval)
    return () => {
      clearInterval(interval)
    }
  }, [time])

  return (
    <div className="timer_container">{time}</div>
  )
}