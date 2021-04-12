const ACTION_CONST = {
  SET_IS_ADDITIONAL_TRANSLATION_SHOWS: "SET_IS_ADDITIONAL_TRANSLATION_SHOWS",
  SET_IS_ADDITIONAL_BUTTONS_SHOWS: "SET_IS_ADDITIONAL_BUTTONS_SHOWS",
  SET_ACTIVE_LANGUAGE: "SET_ACTIVE_LANGUAGE",
  SET_GAME_DIFFICULT: "SET_GAME_DIFFICULT",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_CURRENT_WORDS_GROUP: "SET_CURRENT_WORDS_GROUP",
  SET_CURRENT_WORDS_PAGE: "SET_CURRENT_WORDS_PAGE",
};

export const DEFAULT_VALUES = {
  CURRENT_PAGE: "promo",
  EMPTY: "",
  TRUE: true,
  FALSE: false,
  LANGUAGE: "en",
  DIFFICULT: 6,
  WORDS_GROUP: 0,
  WORDS_PAGE: 0,
};

let initialState = {
  currentPage: DEFAULT_VALUES.CURRENT_PAGE,
  currentWordsGroup: DEFAULT_VALUES.WORDS_GROUP,
  currentWordsPage: DEFAULT_VALUES.WORDS_PAGE,
  isTranslationShown: DEFAULT_VALUES.TRUE,
  isAdditionalButtonsShown: DEFAULT_VALUES.TRUE,
  activeLanguage: DEFAULT_VALUES.LANGUAGE,
  gameDifficult: DEFAULT_VALUES.DIFFICULT,
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONST.SET_IS_ADDITIONAL_TRANSLATION_SHOWS: {
      return {
        ...state,
        isTranslationShown: action.isTranslationShows,
      };
    }
    case ACTION_CONST.SET_IS_ADDITIONAL_BUTTONS_SHOWS: {
      return {
        ...state,
        isAdditionalButtonsShown: action.isAdditionalButtonsShown,
      };
    }
    case ACTION_CONST.SET_ACTIVE_LANGUAGE: {
      return {
        ...state,
        activeLanguage: action.activeLanguage,
      };
    }
    case ACTION_CONST.SET_GAME_DIFFICULT: {
      return {
        ...state,
        gameDifficult: action.gameDifficult
      };
    }
    case ACTION_CONST.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.page
      };
    }
    case ACTION_CONST.SET_CURRENT_WORDS_GROUP: {
      return {
        ...state,
        currentWordsGroup: action.wordsGroup
      };
    }
    case ACTION_CONST.SET_CURRENT_WORDS_PAGE: {
      return {
        ...state,
        currentWordsPage: action.wordsPage
      };
    }
    default:
      return state;
  };
};

export const setIsAdditionalTranslationsShows = (isTranslationShows) => ({
  type: ACTION_CONST.SET_IS_ADDITIONAL_TRANSLATION_SHOWS,
  isTranslationShows,
});

export const setIsAdditionalButtonsShows = (isAdditionalButtonsShown) => ({
  type: ACTION_CONST.SET_IS_ADDITIONAL_BUTTONS_SHOWS,
  isAdditionalButtonsShown,
});

export const setActiveLanguage = (activeLanguage) => ({
  type: ACTION_CONST.SET_ACTIVE_LANGUAGE,
  activeLanguage,
});

export const setGameDifficult = (gameDifficult) => ({
  type: ACTION_CONST.SET_GAME_DIFFICULT,
  gameDifficult
});

export const setCurrentPage = (page) => ({
  type: ACTION_CONST.SET_CURRENT_PAGE,
  page
});

export const setCurrentWordsGroup = (wordsGroup) => ({
  type: ACTION_CONST.SET_CURRENT_WORDS_GROUP,
  wordsGroup
});

export const setCurrentWordsPage = (wordsPage) => ({
  type: ACTION_CONST.SET_CURRENT_WORDS_PAGE,
  wordsPage
});

export default settingsReducer;
