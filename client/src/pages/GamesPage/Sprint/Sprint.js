import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SprintGame } from './components/Sprint/SprintGame'
import { SprintRules } from './components/SprintRules/SprintRules'
import { useHttp } from '../../../hooks/http.hook';
import { RS_LANG_API } from '../../../services/rs-lang-api';
import { constants, Timer } from './components/Timer/Timer';
import { sprintStates } from '../../../assets/constants/sprintStates';
import { Score } from './components/Score/Score';
import { Finish } from './components/Finish/Finish';
import { setIsLoadingInProgress } from '../../../redux/auth-reducer';
import './sprint.scss'
import { MainPagePreloader } from '../../../components/Loader';

export const Sprint = () => {
  const dispatch = useDispatch()
  const { request } = useHttp()
  const [isGameStarted, setIsGameStarted] = useState(sprintStates.started)
  const [gameArr, setGameArr] = useState([])
  const [levelInputValue, setLevelInputText] = useState(1);
  const [pageInputValue, setPageInputText] = useState(1);
  const [score, setScore] = useState(0);
  const [numberOfLearnedWords, setNumberOfLearnedWords] = useState(0);
  const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
  const currentPage = useSelector((store) => store.settingsStore.currentPage);
  const currentWordsPage = useSelector(
    (store) => store.settingsStore.currentWordsPage
  );
  const currentWordsGroup = useSelector(
    (store) => store.settingsStore.currentWordsGroup
  );
  const isLoading = useSelector((store) => store.authStore.isLoading)
  useEffect(useCallback(async () => {
    if (isGameStarted === sprintStates.pending) {
      dispatch(setIsLoadingInProgress(true))
      if (currentPage !== 'main') {
        const fetched = await request(`${RS_LANG_API}words?group=${levelInputValue - constants.one}&page=${pageInputValue - constants.one}`)
        setGameArr(fetched)
      } else {
        const fetched = await request(`${RS_LANG_API}words?group=${currentWordsGroup}&page=${currentWordsPage}`)
        setGameArr(fetched)
      }
      dispatch(setIsLoadingInProgress(false))
    }
  }, [isGameStarted, levelInputValue, pageInputValue, setGameArr, request]), [isGameStarted, levelInputValue, pageInputValue])
  if (isLoading) {
    return <MainPagePreloader />
  }
  return (
    <div className="game-container">
      {isGameStarted === sprintStates.started && <SprintRules setScore={setScore} setGameStarted={setIsGameStarted} isGameStarted={isGameStarted} setPage={setPageInputText} setGroup={setLevelInputText} />
      }
      {isGameStarted === sprintStates.pending && gameArr.length &&
        <>
          <Score score={score} />
          <div className="game-handler">
            <SprintGame numberOfLearned={numberOfLearnedWords}
              numberOfIncorrect={numberOfLearnedWords}
              setNumberOfLearned={setNumberOfLearnedWords}
              setNumberOfIncorrect={setNumberOfIncorrectAnswers}
              gameArr={gameArr} score={score} setScore={setScore} />
            <Timer numOfIncorrect={numberOfIncorrectAnswers}
              numOfLearned={numberOfLearnedWords}
              setIsGameStarted={setIsGameStarted} />
          </div>
        </>
      }
      {isGameStarted === sprintStates.finished &&
        <Finish score={score} setIsGameStarted={setIsGameStarted} />
      }
    </div>
  )
}