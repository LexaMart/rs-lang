import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sprintStates } from '../../../../../assets/constants/sprintStates';
import { RS_LANG_API } from '../../../../../services/rs-lang-api';
import { getStatistic} from '../../../../../redux/statistics-reducer'

import './sprintRules.scss'
export const SprintRules = ({ setScore, setGameStarted, setRand }) => {
  const dispatch = useDispatch()
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);  
  const startSprint = () => {
    setGameStarted(sprintStates.pending)
    setRand([Math.floor(Math.random() * 29)])
    setScore(0)
    if (isAuthenticated) {
      dispatch(getStatistic(userId, token));
    }
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