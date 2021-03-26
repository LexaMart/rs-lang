const ACTION_CONST = {
  SET_IS_ADDITIONAL_TRANSLATION_SHOWS: "SET_IS_ADDITIONAL_TRANSLATION_SHOWS",
  SET_IS_ADDITIONAL_BUTTONS_SHOWS: "SET_IS_ADDITIONAL_BUTTONS_SHOWS",
  SET_ACTIVE_LANGUAGE: "SET_ACTIVE_LANGUAGE",
};

const DEFAULT_VALUES = {
  EMPTY: "",
  TRUE: true,
  FALSE: false,
  LANGUAGE: "en",
};

let initialState = {
  isTranslationShown: DEFAULT_VALUES.TRUE,
  isAdditionalButtonsShown: DEFAULT_VALUES.TRUE,
  activeLanguage: DEFAULT_VALUES.LANGUAGE,
};

const settingsReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
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

export default settingsReducer;
