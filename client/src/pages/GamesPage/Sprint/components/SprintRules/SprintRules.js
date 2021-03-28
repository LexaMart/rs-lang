import React from 'react';

import './sprintRules.scss'
export const SprintRules = ({isGameStarted,setGameStarted}) => {
  return (
  <div className="sprint-rules">
    <p className="rules-text">
      In this game you have one minute to choose as musch correct answers as possible. If you answer right on the first time your this word wiil be marked as learned
    </p>
    <button onClick={() => setGameStarted(!isGameStarted)} className="btn waves-effect waves-light red" type="button" name="action">START</button>
  </div>
  )
}