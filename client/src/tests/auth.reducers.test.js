import authReducer, { DEFAULT_VALUES } from '../redux/auth-reducer';

let initialState = {
  userData: DEFAULT_VALUES.EMPTY,
  isAuthorized: DEFAULT_VALUES.FALSE,
  isLoading: DEFAULT_VALUES.FALSE,
};

test("User will be logout's", () => {
  let newState = authReducer(initialState, { type: "SET_DEFAULT_VALUES" });
  initialState.isAuthorized = true
  expect(newState.isAuthorized).toBeFalsy();
});

test('User data will be added', () => {
  let newState = authReducer(initialState, { type: "SET_USER_DATA", userData: "test" })
  expect(newState.userData).toBe('test')
})

test('Set loading in progress', () => {
  let newState = authReducer(initialState, { type: "AUTH_REDUCER_TOGGLE_IS_LOADING_PROGRESS", isLoading: true })
  expect(newState.isLoading).toBeTruthy()
})
