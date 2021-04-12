import { rsLangApi } from "../services/rs-lang-api";
const ACTION_CONST = {
  ADD_LEARNED_WORDS_NUMBER: "ADD_LEARNED_WORDS_NUMBER",
  SET_SAVANNAH_LEARNED_WORDS_NUMBER: "SET_SAVANNAH_LEARNED_WORDS_NUMBER",
  SET_SAVANNAH_INCORRECT_ANSWERS_NUMBER:
    "SET_SAVANNAH_INCORRECT_ANSWERS_NUMBER",
  SET_AUDIO_CALL_LEARNED_WORDS_NUMBER: "SET_AUDIO_CALL_LEARNED_WORDS_NUMBER",
  SET_AUDIO_CALL_INCORRECT_ANSWERS_NUMBER:
    "SET_AUDIO_CALL_INCORRECT_ANSWERS_NUMBER",
  SET_SPRINT_LEARNED_WORDS_NUMBER: "SET_SPRINT_LEARNED_WORDS_NUMBER",
  SET_SPRINT_INCORRECT_ANSWERS_NUMBER: "SET_SPRINT_INCORRECT_ANSWERS_NUMBER",
  SET_MY_GAME_LEARNED_WORDS_NUMBER: "SET_MY_GAME_LEARNED_WORDS_NUMBER",
  SET_MY_GAME_INCORRECT_ANSWERS_NUMBER: "SET_MY_GAME_INCORRECT_ANSWERS_NUMBER",
  SET_STATISTICS_DATA: "SET_STATISTICS_DATA",
};

const DEFAULT_VALUES = {
  EMPTY: "",
  TRUE: true,
  FALSE: false,
  LANGUAGE: "en",
  ZERO: 0,
};
let initialState = {
  learnedWords: DEFAULT_VALUES.ZERO,
  incorrectAnswers: DEFAULT_VALUES.ZERO,
  savannahMaxSeries: DEFAULT_VALUES.ZERO,
  savannahLearnedWords: DEFAULT_VALUES.ZERO,
  savannahIncorrectAnswers: DEFAULT_VALUES.ZERO,
  audioCallMaxSeries: DEFAULT_VALUES.ZERO,
  audioCallLearnedWords: DEFAULT_VALUES.ZERO,
  audioCallIncorrectAnswers: DEFAULT_VALUES.ZERO,
  sprintMaxSeries: DEFAULT_VALUES.ZERO,
  sprintLearnedWords: DEFAULT_VALUES.ZERO,
  sprintIncorrectAnswers: DEFAULT_VALUES.ZERO,
  myGameMaxSeries: DEFAULT_VALUES.ZERO,
  myGameLearnedWords: DEFAULT_VALUES.ZERO,
  myGameIncorrectAnswers: DEFAULT_VALUES.ZERO,
  statisticsData: DEFAULT_VALUES.EMPTY,
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONST.SET_SAVANNAH_LEARNED_WORDS_NUMBER: {
      return {
        ...state,
        learnedWords: state.learnedWords + action.savannahLearnedWords,
        savannahLearnedWords:
          state.savannahLearnedWords + action.savannahLearnedWords,
        savannahMaxSeries: Math.max(
          state.savannahMaxSeries,
          action.savannahLearnedWords
        ),
      };
    }
    case ACTION_CONST.SET_SAVANNAH_INCORRECT_ANSWERS_NUMBER: {
      return {
        ...state,
        incorrectAnswers:
          state.incorrectAnswers + action.savannahIncorrectAnswers,
        savannahIncorrectAnswers:
          state.savannahIncorrectAnswers + action.savannahIncorrectAnswers,
      };
    }
    case ACTION_CONST.SET_AUDIO_CALL_LEARNED_WORDS_NUMBER: {
      return {
        ...state,
        learnedWords: state.learnedWords + action.audioCallLearnedWords,
        audioCallLearnedWords:
          state.audioCallLearnedWords + action.audioCallLearnedWords,
        audioCallMaxSeries: Math.max(
          state.audioCallMaxSeries,
          action.audioCallLearnedWords
        ),
      };
    }
    case ACTION_CONST.SET_AUDIO_CALL_INCORRECT_ANSWERS_NUMBER: {
      return {
        ...state,
        incorrectAnswers:
          state.incorrectAnswers + action.audioCallIncorrectAnswers,
        audioCallIncorrectAnswers:
          state.audioCallIncorrectAnswers + action.audioCallIncorrectAnswers,
      };
    }
    case ACTION_CONST.SET_SPRINT_LEARNED_WORDS_NUMBER: {
      return {
        ...state,
        learnedWords: state.learnedWords + action.sprintLearnedWords,
        sprintLearnedWords:
          state.sprintLearnedWords + action.sprintLearnedWords,
        sprintMaxSeries: Math.max(
          state.sprintMaxSeries,
          action.sprintLearnedWords
        ),
      };
    }
    case ACTION_CONST.SET_SPRINT_INCORRECT_ANSWERS_NUMBER: {
      return {
        ...state,
        incorrectAnswers:
          state.incorrectAnswers + action.sprintIncorrectAnswers,
        sprintIncorrectAnswers:
          state.sprintIncorrectAnswers + action.sprintIncorrectAnswers,
      };
    }
    case ACTION_CONST.SET_MY_GAME_LEARNED_WORDS_NUMBER: {
      return {
        ...state,
        learnedWords: state.learnedWords + action.myGameLearnedWords,
        myGameLearnedWords:
          state.myGameLearnedWords + action.myGameLearnedWords,
        myGameMaxSeries: Math.max(
          state.myGameMaxSeries,
          action.myGameLearnedWords
        ),
      };
    }
    case ACTION_CONST.SET_MY_GAME_INCORRECT_ANSWERS_NUMBER: {
      return {
        ...state,
        incorrectAnswers:
          state.incorrectAnswers + action.myGameIncorrectAnswers,
        myGameIncorrectAnswers:
          state.myGameIncorrectAnswers + action.myGameIncorrectAnswers,
      };
    }
    case ACTION_CONST.SET_STATISTICS_DATA: {
      return {
        ...state,
        statisticsData: action.statisticsData,
      };
    }
    default:
      return state;
  }
};

export const setSavannahLearnedWords = (savannahLearnedWords) => ({
  type: ACTION_CONST.SET_SAVANNAH_LEARNED_WORDS_NUMBER,
  savannahLearnedWords,
});

export const setSavannahIncorrectAnswers = (savannahIncorrectAnswers) => ({
  type: ACTION_CONST.SET_SAVANNAH_INCORRECT_ANSWERS_NUMBER,
  savannahIncorrectAnswers,
});

export const setAudioCallLearnedWords = (audioCallLearnedWords) => ({
  type: ACTION_CONST.SET_AUDIO_CALL_LEARNED_WORDS_NUMBER,
  audioCallLearnedWords,
});

export const setAudioCallIncorrectAnswers = (audioCallIncorrectAnswers) => ({
  type: ACTION_CONST.SET_AUDIO_CALL_INCORRECT_ANSWERS_NUMBER,
  audioCallIncorrectAnswers,
});

export const setSprintLearnedWords = (sprintLearnedWords) => ({
  type: ACTION_CONST.SET_SPRINT_LEARNED_WORDS_NUMBER,
  sprintLearnedWords,
});

export const setSprintIncorrectAnswers = (sprintIncorrectAnswers) => ({
  type: ACTION_CONST.SET_SPRINT_INCORRECT_ANSWERS_NUMBER,
  sprintIncorrectAnswers,
});
export const setMyGameLearnedWords = (myGameLearnedWords) => ({
  type: ACTION_CONST.SET_MY_GAME_LEARNED_WORDS_NUMBER,
  myGameLearnedWords,
});

export const setMyGameIncorrectAnswers = (myGameIncorrectAnswers) => ({
  type: ACTION_CONST.SET_MY_GAME_INCORRECT_ANSWERS_NUMBER,
  myGameIncorrectAnswers,
});
// export const setTodaysStatistic = (todaysStatistic) => ({
//   type: ACTION_CONST.ADD_DAYS_STATISTIC,
//   todaysStatistic,
// });

export const setStatistics = (statisticsData) => ({
  type: ACTION_CONST.SET_STATISTICS_DATA,
  statisticsData,
});

export const getStatistic = (userId, token) => async (dispatch) => {
  const response = await rsLangApi.getStatistic(userId, token);
  if (response) {
    dispatch(setStatistics(response.data));
  }
};

export default statisticsReducer;
