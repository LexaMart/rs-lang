import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendStatistic } from '../../../GameUtilities/GameUtilities'
import { setSprintLearnedWords, setSprintIncorrectAnswers } from '../../../../../redux/statistics-reducer'
import { sprintStates } from '../../../../../assets/constants/sprintStates';
import './timer.scss';


export const Timer = ({ numOfLearned, numOfIncorrect, setIsGameStarted }) => {
  const dispatch = useDispatch()
  const [time, setTime] = useState(10);
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
    console.log(numOfLearned)
    console.log(numOfIncorrect)
    dispatch(setSprintLearnedWords(numOfLearned))
    dispatch(setSprintIncorrectAnswers(numOfIncorrect))
    sendStatistic(isAuthenticated, userId, token, wholeLearnedWords, optionalStatisticObject, numOfLearned, numOfIncorrect)
    setIsGameStarted(sprintStates.finished)
  }


  useEffect(() => {
    const interval = setInterval(() => {
      if (time <= 0) {
        stopGame()
        clearInterval(interval)
      }
      setTime(time - 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [time])

  return (
    <div className="timer_container">{time}</div>
  )
}