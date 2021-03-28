import React, { useCallback, useEffect, useState } from 'react'


import { SprintGame } from './components/Sprint/SprintGame'
import { SprintRules } from './components/SprintRules/SprintRules'
import { useHttp } from '../../../hooks/http.hook';
import { RS_LANG_API } from '../../../services/rs-lang-api';
import { Timer } from './components/Timer/Timer';
import { sprintStates } from '../../../assets/constants/sprintStates';



export const Sprint = () => {

  const { request } = useHttp()
  const [isGameStarted, setIsGameStarted] = useState(sprintStates.started)
  const [gameArr, setGameArr] = useState([])
  const [randomNum, setRandomNum] = useState([null, null])

  useEffect(useCallback(async () => {
    if (isGameStarted === sprintStates.pending) {
      const fetched = await request(`${RS_LANG_API}words?group=${randomNum[0]}&page=${randomNum[1]}`)
      setGameArr(fetched)
    }
  }, [isGameStarted, randomNum, setGameArr, request]), [isGameStarted, randomNum])
  return (
    <div className="game-block">
      {isGameStarted === sprintStates.started && <SprintRules setGameStarted={setIsGameStarted} isGameStarted={isGameStarted} rand={randomNum} setRand={setRandomNum} />
      }
      {isGameStarted === sprintStates.pending && gameArr.length &&
        <>
          <SprintGame gameArr={gameArr} />
          <Timer setIsGameStarted={setIsGameStarted} />
        </>
      }
      {isGameStarted === sprintStates.finished && 
      <div onClick={() => setIsGameStarted(sprintStates.started)}> GG </div>
       }
    </div>
  )
}