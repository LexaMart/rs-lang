import settingsReducer, {DEFAULT_VALUES} from "../redux/settings-reducer";

let initialState = {
  isTranslationShown: DEFAULT_VALUES.TRUE,
  isAdditionalButtonsShown: DEFAULT_VALUES.TRUE,
  activeLanguage: DEFAULT_VALUES.LANGUAGE,
  gameDifficult : DEFAULT_VALUES.DIFFICULT
};

test('Show translation state will be changed', () => {
  let newState = settingsReducer(initialState, {type: "SET_IS_ADDITIONAL_TRANSLATION_SHOWS", isTranslationShows: false})
  expect(newState.isTranslationShown).toBe(false)
})

test('Show additional buttons state will be switched', () => {
  let newState = settingsReducer(initialState, {type: "SET_IS_ADDITIONAL_BUTTONS_SHOWS", isAdditionalButtonsShown: false})
  expect(newState.isAdditionalButtonsShown).toBe(false)
})

test('Default language state will be switched', () => {
  let newState = settingsReducer(initialState, {type: "SET_ACTIVE_LANGUAGE", activeLanguage: 'test'})
  expect(newState.activeLanguage).toBe('test')
})

test('Set new game difficult', () => {
  let newState = settingsReducer(initialState, {type: "SET_GAME_DIFFICULT", gameDifficult: 2})
  expect(newState.gameDifficult).toBe(2)
 })