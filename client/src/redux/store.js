import { applyMiddleware, combineReducers, createStore } from "redux";

import authReducer from "./auth-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import settingsReducer from "./settings-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  authStore: authReducer,
  settingsStore: settingsReducer,
});

let initialState = {};

let store = createStore(
  reducers,
  localStorage.reduxState ? JSON.parse(localStorage.reduxState) : initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

store.subscribe(
  () => (localStorage.reduxState = JSON.stringify(store.getState()))
);

export default store;
