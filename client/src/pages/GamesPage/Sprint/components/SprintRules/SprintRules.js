import React from 'react';
import { sprintStates } from '../../../../../assets/constants/sprintStates';
import { RS_LANG_API } from '../../../../../services/rs-lang-api';



import './sprintRules.scss'
export const SprintRules = ({ setScore, setGameStarted, setRand }) => {
  const startSprint = () => {
    setGameStarted(sprintStates.pending)
    setRand([Math.floor(Math.random() * 29)])
    setScore(0)
  }
  return (
    <div className="sprint-rules">
      <p className="rules-text">
        In this game you have one minute to choose as musch correct answers as possible. If you answer right on the first time your this word wiil be marked as learned
    </p>
      <button onClick={() => startSprint()} className="btn waves-effect waves-light red" type="button" name="action">START</button>
    </div>
  )
}