import { rsLangApi } from "../services/rs-lang-api";

const ACTION_CONST = {
  SET_USER_DATA: "SET_USER_DATA",
  SET_DEFAULT_VALUES: "SET_DEFAULT_VALUES",
  SET_IS_LOADING_PROGRESS: "AUTH_REDUCER_TOGGLE_IS_LOADING_PROGRESS",
};

const DEFAULT_VALUES = {
  EMPTY: "",
  TRUE: true,
  FALSE: false,
};

let initialState = {
  userData: DEFAULT_VALUES.EMPTY,
  isAuthorized: DEFAULT_VALUES.FALSE,
  isLoading: DEFAULT_VALUES.FALSE,
};

const authReducer = (state = initialState, action) => {
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

export const logout = () => ({ type: ACTION_CONST.SET_DEFAULT_VALUES });

export const login = (email, password) => async (dispatch) => {
  dispatch(setIsLoadingInProgress(true));
  const response = await rsLangApi.login(email, password);
  if (response.data) {
    dispatch(setUserData(response.data));
  }

  dispatch(setIsLoadingInProgress(false));
};

export const register = (userName, email, password, image) => async (
  dispatch
) => {
  dispatch(setIsLoadingInProgress(true));
  const response = await rsLangApi.register(userName, email, password, image);
  if (response.data) {
    dispatch(setUserData(response.data));
  }
  dispatch(setIsLoadingInProgress(false));
};

export default authReducer;
