import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sprintStates } from '../../../../../assets/constants/sprintStates';
import { getStatistic } from '../../../../../redux/statistics-reducer';
import {
  LANGUAGE_CONFIG,
  WORDS_CONFIG,
} from '../../../../../shared/words-config.js';

import { Select } from 'react-materialize';

import './sprintRules.scss';
import { MAX_NUMBER } from '../../../Savannah/Savannah';
export const SprintRules = ({
  setScore,
  setGameStarted,
  setPage,
  setGroup,
}) => {
  const levelsArray = [];
  const pagesArray = [];
  for (let i = 0; i < MAX_NUMBER.LEVEL; i++) {
    levelsArray.push(i + 1);
  }
  for (let i = 0; i < MAX_NUMBER.PAGE; i++) {
    pagesArray.push(i + 1);
  }
  const currentPage = useSelector((store) => store.settingsStore.currentPage);
  const levelInputValue = 1;
  const pageInputValue = 1;
  const dispatch = useDispatch();
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);

  const language = useSelector((store) => store.settingsStore.activeLanguage);

  const startSprint = () => {
    setGameStarted(sprintStates.pending);
    setScore(0);
    if (isAuthenticated) {
      dispatch(getStatistic(userId, token));
    }
  };
  return (
    <div className="sprint-rules">
      <p className="rules-text">
        {language === LANGUAGE_CONFIG.foreign
          ? WORDS_CONFIG.SPRINT_PAGE_RULES.foreign
          : WORDS_CONFIG.SPRINT_PAGE_RULES.native}
      </p>
      {currentPage !== 'main' && (
        <>
          <Select
            id="select-level"
            multiple={false}
            onChange={(event) => setGroup(event.currentTarget.value)}
            value={levelInputValue}
          >
            {levelsArray.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </Select>
          <Select
            id="select-page"
            multiple={false}
            onChange={(event) => setPage(event.currentTarget.value)}
            value={pageInputValue}
          >
            {pagesArray.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </Select>
        </>
      )}
      <button
        onClick={() => startSprint()}
        className="btn start-sprint waves-effect waves-light red"
        type="button"
        name="action"
      >
        {language === LANGUAGE_CONFIG.foreign ? 'START' : 'СТАРТ'}
      </button>
    </div>
  );
};
