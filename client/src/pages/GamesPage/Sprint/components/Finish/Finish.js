import React from 'react'
import { sprintStates } from '../../../../../assets/constants/sprintStates'
import './finish.scss'

export const Finish = ({score, setIsGameStarted}) => {
  return (
    <div className="finish-screen">
      <p className="finish-text">
        Game is Over your score is <b>{score}</b>
      </p>
      <button className="btn sprint-restart waves-effect waves-light red" onClick={() => setIsGameStarted(sprintStates.started)}>
        Restart
      </button>
    </div>
  )
}