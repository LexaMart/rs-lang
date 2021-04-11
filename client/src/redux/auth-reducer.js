import { rsLangApi } from '../services/rs-lang-api';
import { getWords } from '../services/getAllWords';

const ACTION_CONST = {
  SET_USER_DATA: 'SET_USER_DATA',
  SET_DEFAULT_VALUES: 'SET_DEFAULT_VALUES',
  SET_IS_LOADING_PROGRESS: 'AUTH_REDUCER_TOGGLE_IS_LOADING_PROGRESS',
  SET_USER_LEARNING_WORDS: ' SET_USER_LEARNING_WORDS',
  SET_USER_HARD_WORDS: 'SET_USER_HARD_WORDS',
  SET_USER_DELETED_WORDS: 'SET_USER_DELETED_WORDS',
  ADD_DELETED_WORD: 'ADD_DELETED_WORD',
  REMOVE_DELETED_WORD: 'REMOVE_DELETED_WORD',
  ADD_HARD_WORD: 'ADD_HARD_WORD',
  REMOVE_HARD_WORD: 'REMOVE_HARD_WORD',
  ADD_LEARNING_WORD: 'ADD_LEARNING_WORD',
  REMOVE_LEARNING_WORD: 'REMOVE_LEARNING_WORD',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_REGISTER: 'SET_REGISTER',
};

export const DEFAULT_VALUES = {
  EMPTY: '',
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
  authMessage: DEFAULT_VALUES.FALSE,
  registerSucces: DEFAULT_VALUES.FALSE,
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
    case ACTION_CONST.SET_MESSAGE: {
      return {
        ...state,
        authMessage: action.message,
      };
    }
    case ACTION_CONST.SET_REGISTER: {
      return {
        ...state,
        registerSucces: action.register
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
    case ACTION_CONST.ADD_DELETED_WORD: {
      const stagedUserDeletedWords = state.userDeletedWords.slice();
      stagedUserDeletedWords.push(action.activeWordId);
      return { ...state, userDeletedWords: stagedUserDeletedWords };
    }
    case ACTION_CONST.REMOVE_DELETED_WORD: {
      const stagedUserDeletedWords = state.userDeletedWords.filter(
        (item) => item !== action.activeWordId
      );
      return { ...state, userDeletedWords: stagedUserDeletedWords };
    }
    case ACTION_CONST.ADD_HARD_WORD: {
      const stagedUserHardWords = state.userHardWords.slice();
      stagedUserHardWords.push(action.activeWordId);
      return { ...state, userHardWords: stagedUserHardWords };
    }
    case ACTION_CONST.REMOVE_HARD_WORD: {
      const stagedUserHardWords = state.userHardWords.filter(
        (item) => item !== action.activeWordId
      );
      return { ...state, userHardWords: stagedUserHardWords };
    }
    case ACTION_CONST.ADD_LEARNING_WORD: {
      const stagedUserLearningWords = state.userLearningWords.slice();
      stagedUserLearningWords.push(action.activeWordId);
      return { ...state, userLearningWords: stagedUserLearningWords };
    }
    case ACTION_CONST.REMOVE_LEARNING_WORD: {
      const stagedUserLearningWords = state.userLearningWords.filter(
        (item) => item !== action.activeWordId
      );
      return { ...state, userLearningWords: stagedUserLearningWords };
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

export const addDeletedWord = (activeWordId) => ({
  type: ACTION_CONST.ADD_DELETED_WORD,
  activeWordId,
});
export const removeDeletedWord = (activeWordId) => ({
  type: ACTION_CONST.REMOVE_DELETED_WORD,
  activeWordId,
});
export const addHardWord = (activeWordId) => ({
  type: ACTION_CONST.ADD_HARD_WORD,
  activeWordId,
});
export const removeHardWord = (activeWordId) => ({
  type: ACTION_CONST.REMOVE_HARD_WORD,
  activeWordId,
});

export const addLearningWord = (activeWordId) => ({
  type: ACTION_CONST.ADD_LEARNING_WORD,
  activeWordId,
});
export const removeLearningWord = (activeWordId) => ({
  type: ACTION_CONST.REMOVE_LEARNING_WORD,
  activeWordId,
});
export const setMessage = (message) => ({
  type: ACTION_CONST.SET_MESSAGE,
  message
});
export const setRegister = (register) => ({
  type: ACTION_CONST.SET_REGISTER,
  register
})
export const logout = () => ({ type: ACTION_CONST.SET_DEFAULT_VALUES });
export const login = (email, password) => async (dispatch) => {
  dispatch(setIsLoadingInProgress(true));
  const response = await rsLangApi.login(email, password);
  const words = {
    learn: true,
    hard: true,
    deleted: true,
  };
  if (response) {
    dispatch(setMessage(DEFAULT_VALUES.FALSE))
    dispatch(setUserData(response.data));
    await getWords(response.data.token, response.data.userId, words).then(
      (res) => {
        dispatch(setUserLearningWords(res.learn));
        dispatch(setUserHardWords(res.hard));
        dispatch(setUserDeletedWords(res.deleted));
      }
    );
  } else {
    dispatch(setMessage(DEFAULT_VALUES.TRUE));
    setTimeout(() => {
      dispatch(setMessage(DEFAULT_VALUES.FALSE));
    }, 1)
  }

  dispatch(setIsLoadingInProgress(false));
};

export const register = (userName, email, password, image) => async (
  dispatch
) => {
  dispatch(setIsLoadingInProgress(true));
  const response = await rsLangApi.register(userName, email, password, image);
  if (!response) {
    dispatch(setMessage(DEFAULT_VALUES.TRUE));
    dispatch(setMessage(DEFAULT_VALUES.FALSE));
  } else {
    dispatch(setMessage(DEFAULT_VALUES.FALSE));
    dispatch(setRegister(true));
    dispatch(setRegister(false))

  }
  dispatch(setIsLoadingInProgress(false));
};

export default authReducer;
