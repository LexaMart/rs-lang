import { rsLangApi } from "../services/rs-lang-api";

const ACTION_CONST = {
  SET_USER_DATA: "SET_USER_DATA",
  SET_DEFAULT_VALUES: "SET_DEFAULT_VALUES",
  SET_IS_LOADING_PROGRESS: "AUTH_REDUCER_TOGGLE_IS_LOADING_PROGRESS",
  SET_USER_LEARNING_WORDS: " SET_USER_LEARNING_WORDS",
  SET_USER_HARD_WORDS: "SET_USER_HARD_WORDS",
  SET_USER_DELETED_WORDS: "SET_USER_DELETED_WORDS",
};

export const DEFAULT_VALUES = {
  EMPTY: "",
  TRUE: true,
  FALSE: false,
  EMPTY_ARRAY: [],
};

let initialState = {
  userData: DEFAULT_VALUES.EMPTY,
  isAuthorized: DEFAULT_VALUES.FALSE,
  isLoading: DEFAULT_VALUES.FALSE,
  userLearningWords: DEFAULT_VALUES.EMPTY_ARRAY,
  userHardWords: DEFAULT_VALUES.EMPTY_ARRAY,
  userDeletedWords: DEFAULT_VALUES.EMPTY_ARRAY,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONST.SET_USER_DATA: {
      return {
        ...state,
        userData: action.userData,
        isAuthorized: DEFAULT_VALUES.TRUE,
      };
    }
    case ACTION_CONST.SET_DEFAULT_VALUES: {
      return {
        ...state,
        isAuthorized: DEFAULT_VALUES.FALSE,
        token: DEFAULT_VALUES.EMPTY,
      };
    }
    case ACTION_CONST.SET_IS_LOADING_PROGRESS: {
      return { ...state, isLoading: action.isLoading };
    }
    case ACTION_CONST.SET_USER_LEARNING_WORDS: {
      return { ...state, userLearningWords: action.arrLearnWords };
    }
    case ACTION_CONST.SET_USER_HARD_WORDS: {
      return { ...state, userHardWords: action.arrHardWords };
    }
    case ACTION_CONST.SET_USER_DELETED_WORDS: {
      return { ...state, userDeletedWords: action.arrDeletedWords };
    }
    default:
      return state;
  }
};

export const setUserData = (userData) => ({
  type: ACTION_CONST.SET_USER_DATA,
  userData,
});

export const setIsLoadingInProgress = (isLoading) => ({
  type: ACTION_CONST.SET_IS_LOADING_PROGRESS,
  isLoading,
});

export const setUserLearningWords = (arrLearnWords) => ({
  type: ACTION_CONST.SET_USER_LEARNING_WORDS,
  arrLearnWords,
});

export const setUserHardWords = (arrHardWords) => ({
  type: ACTION_CONST.SET_USER_HARD_WORDS,
  arrHardWords,
});

export const setUserDeletedWords = (arrDeletedWords) => ({
  type: ACTION_CONST.SET_USER_DELETED_WORDS,
  arrDeletedWords,
});

export const logout = () => ({ type: ACTION_CONST.SET_DEFAULT_VALUES });

export const login = (email, password) => async (dispatch) => {
  dispatch(setIsLoadingInProgress(true));
  const response = await rsLangApi.login(email, password);
  if (response) {
    dispatch(setUserData(response.data));
  } else alert("Wrong email or password")

  dispatch(setIsLoadingInProgress(false));
};

export const register = (userName, email, password, image) => async (
  dispatch
) => {
  dispatch(setIsLoadingInProgress(true));
  const response = await rsLangApi.register(userName, email, password, image);
  //TODO
  // if (response) {
  //   login(response.data.email, response.data.password)
  // }
  dispatch(setIsLoadingInProgress(false));
};

export default authReducer;
