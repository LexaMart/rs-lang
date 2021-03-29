import React, { useCallback, useEffect, useState } from 'react'


import { SprintGame } from './components/Sprint/SprintGame'
import { SprintRules } from './components/SprintRules/SprintRules'
import { useHttp } from '../../../hooks/http.hook';
import { RS_LANG_API } from '../../../services/rs-lang-api';
import { Timer } from './components/Timer/Timer';
import { sprintStates } from '../../../assets/constants/sprintStates';
import { Score } from './components/Score/Score';
import { Finish } from './components/Finish/Finish';


import './sprint.scss'

export const Sprint = () => {

  const { request } = useHttp()
  const [isGameStarted, setIsGameStarted] = useState(sprintStates.started)
  const [gameArr, setGameArr] = useState([])
  const [randomNum, setRandomNum] = useState([null, null])
  const [score, setScore] = useState(0);

  useEffect(useCallback(async () => {
    if (isGameStarted === sprintStates.pending) {
      const fetched = await request(`${RS_LANG_API}words?group=${randomNum[0]}&page=${randomNum[1]}`)
      setGameArr(fetched)
    }
  }, [isGameStarted, randomNum, setGameArr, request]), [isGameStarted, randomNum])
  return (
    <div className="game-container">
      {isGameStarted === sprintStates.started && <SprintRules setScore={setScore} setGameStarted={setIsGameStarted} isGameStarted={isGameStarted} rand={randomNum} setRand={setRandomNum} />
      }
      {isGameStarted === sprintStates.pending && gameArr.length &&
        <>
          <Score score={score} />
          <div className="game-handler">
            <SprintGame gameArr={gameArr} score={score} setScore={setScore} />
            <Timer setIsGameStarted={setIsGameStarted} />
          </div>
        </>
      }
      {isGameStarted === sprintStates.finished &&
        <Finish score={score} setIsGameStarted={setIsGameStarted} />
      }
    </div>
  )
}