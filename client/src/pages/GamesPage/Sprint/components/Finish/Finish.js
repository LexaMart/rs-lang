import React from 'react'
import { sprintStates } from '../../../../../assets/constants/sprintStates'

export const Finish = ({score, setIsGameStarted}) => {
  return (
    <div className="finish-screen">
      <p className="finish-text">
        Game is Over your score is <b>{score}</b>
      </p>
      <button className="btn red" onClick={() => setIsGameStarted(sprintStates.started)}>
        Restart
      </button>
    </div>
  )
}