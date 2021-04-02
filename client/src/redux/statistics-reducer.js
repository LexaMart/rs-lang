import moment from 'moment';
const ACTION_CONST = {
   ADD_LEARNED_WORDS_NUMBER: "ADD_LEARNED_WORDS_NUMBER",
   ADD_DAYS_STATISTIC: 'ADD_DAYS_STATISTIC',
    ADD_CORRECT_WORDS: "ADD_CORRECT_WORDS",
    ADD_INCORRECT_WORDS: "ADD_INCORRECT_WORDS",
    SET_SAVANNAH_LEARNED_WORDS_NUMBER: 'SET_SAVANNAH_LEARNED_WORDS_NUMBER',
  };

  
  const DEFAULT_VALUES = {
    EMPTY: "",
    TRUE: true,
    FALSE: false,
    LANGUAGE: "en",
    ZERO: 0,
  };
  // let now = moment().format('DD-MM-YYYY');
  let initialState = {
    learnedWords: DEFAULT_VALUES.ZERO,
    savannahMaxSeries: DEFAULT_VALUES.ZERO,
    optional: {}
  };
  
  const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_CONST.ADD_LEARNED_WORDS_NUMBER: {
        return {
          ...state,
          learnedWords: state.learnedWords + action.learnedWords,
        };
      }
      case ACTION_CONST.ADD_DAYS_STATISTIC: {
        return {
          ...state,
          optional: [ ...state.optional, action.todaysStatistic],
        };
      }
      case ACTION_CONST.SET_SAVANNAH_LEARNED_WORDS_NUMBER: {
        return {
          ...state,
          savannahMaxSeries: Math.max(state.savannahMaxSeries, action.learnedWords),
        };
      }
      default:
        return state;
    }
  };
  
  export const addLearnedWords = (learnedWords) => ({
    type: ACTION_CONST.ADD_LEARNED_WORDS_NUMBER,
    learnedWords,
  });

  export const setSavannahMaxSeries = (learnedWords) => ({
    type: ACTION_CONST.SET_SAVANNAH_LEARNED_WORDS_NUMBER,
    learnedWords,
  });

  export const setTodaysStatistic = (todaysStatistic) => ({
    type: ACTION_CONST.ADD_DAYS_STATISTIC,
    todaysStatistic,
  });
  
  // export const setIsAdditionalButtonsShows = (isAdditionalButtonsShown) => ({
  //   type: ACTION_CONST.SET_IS_ADDITIONAL_BUTTONS_SHOWS,
  //   isAdditionalButtonsShown,
  // });
  
  // export const setActiveLanguage = (activeLanguage) => ({
  //   type: ACTION_CONST.SET_ACTIVE_LANGUAGE,
  //   activeLanguage,
  // });
  
  export default statisticsReducer;
  