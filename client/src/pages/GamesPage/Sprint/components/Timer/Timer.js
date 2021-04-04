import React, { useEffect, useState } from 'react'
import { sprintStates } from '../../../../../assets/constants/sprintStates';
import './timer.scss';


export const Timer = ({setIsGameStarted}) => {
  const [time, setTime] = useState(60);

  const stopGame = () => {
    setIsGameStarted(sprintStates.finished)
  }


  useEffect(() => {
    const interval = setInterval(() => {
      if (time <=0) {
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