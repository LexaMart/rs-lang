import {wordsMockData} from "./wordsMockData";

const ACTION_CONST = {
    SET_IS_GAME_STARTED: "SET_IS_GAME_STARTED",
    SET_IS_WORDS_DATA: "SET_WORDS_DATA",
    SET_ACTIVE_CARD: "SET_ACTIVE_CARD",
    SET_CARDS_FOR_SELECTION: "SET_CARDS_FOR_SELECTION",
    GUESS_THE_WORD: "GUESS_THE_WORD",
    NOT_GUESS_THE_WORD: "NOT_GUESS_THE_WORD",
    SET_DEFAULT_VALUES: "SET_DEFAULT_VALUES",
  };
  
  const DEFAULT_VALUES = {
    EMPTY: "",
    TRUE: true,
    FALSE: false,
    LANGUAGE: "en",
    LIVES_ARRAY: [1, 1, 1, 1, 1],
  };
  
  let initialState = {
      wordsData: wordsMockData,
      remainWordsData: wordsMockData,
    activeCard: null,
    cardsForSelection: null,
    isGameStarted: DEFAULT_VALUES.FALSE,
    isAdditionalButtonsShown: DEFAULT_VALUES.TRUE,
    activeLanguage: DEFAULT_VALUES.LANGUAGE,
    livesArray: DEFAULT_VALUES.LIVES_ARRAY,
    isGameWon: DEFAULT_VALUES.FALSE,
    isGameLost: DEFAULT_VALUES.FALSE,
  };
  
  const savannahReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_CONST.SET_DEFAULT_VALUES: {
        return {
         ...initialState
        };
      }
      case ACTION_CONST.SET_IS_GAME_STARTED: {
        return {
          ...state,
          isGameStarted: action.isGameStarted,
        };
      }
      case ACTION_CONST.SET_ACTIVE_CARD: {  
        const randomValue = Math.floor(Math.random() * Math.floor(state.remainWordsData.length));
        const remainWordsDataArray = state.remainWordsData.slice();
        remainWordsDataArray.splice(randomValue, 1);
        return {
          ...state,
          activeCard: state.remainWordsData[randomValue],
          remainWordsData: [...remainWordsDataArray]
        };
      }
      case ACTION_CONST.SET_CARDS_FOR_SELECTION: {
        const arrayOfCardsForSelect = [...state.wordsData];
        //TODO
        const length = 3;
        const result = [];
        for (let i = 0; i < length; i++) {
            let index = Math.floor(Math.random() * Math.floor(arrayOfCardsForSelect.length -1));
            let curCard = arrayOfCardsForSelect[index];
            arrayOfCardsForSelect.splice(index, 1);
            result.push(curCard);
          }
        result.splice(Math.floor(Math.random() * Math.floor(3)), 0, state.activeCard);
        return {
          ...state,
          cardsForSelection: result,
        };
      }
      case ACTION_CONST.GUESS_THE_WORD: {  
        if (state.remainWordsData.length) {
          return {
            ...state,
          };
        } else {
          return {
            ...state,
            isGameWon: DEFAULT_VALUES.TRUE,
            isGameStarted: DEFAULT_VALUES.FALSE,
          };
        };
      }
      case ACTION_CONST.NOT_GUESS_THE_WORD: {  
        if (state.livesArray.length) {
          const remainLivesArray = state.livesArray.slice();
          remainLivesArray.splice(0,1);
          return {
            ...state,
            livesArray: [...remainLivesArray],
          };
        } else {
          return {
            ...state,
            isGameLost: DEFAULT_VALUES.TRUE,
            isGameStarted: DEFAULT_VALUES.FALSE,
          };
        }
      }
      default:
        return state;
    }
  };
  
  export const setIsGameStarted = (isGameStarted) => ({
    type: ACTION_CONST.SET_IS_GAME_STARTED,
    isGameStarted,
  });
  
  export const setActiveCard = () => ({
    type: ACTION_CONST.SET_ACTIVE_CARD,
  });
  
  export const setCardsForSelection = () => ({
    type: ACTION_CONST.SET_CARDS_FOR_SELECTION,
    
  });
  export const guessTheWord = () => ({
    type: ACTION_CONST.GUESS_THE_WORD,
    
  });
  export const setDefaultValues= () => ({
    type: ACTION_CONST.SET_DEFAULT_VALUES,
    
  });
  export const notGuessTheWord = () => ({
    type: ACTION_CONST.NOT_GUESS_THE_WORD,
    
  });
  
  export default savannahReducer;
  