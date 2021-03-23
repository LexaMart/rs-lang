import {wordsMockData} from "./wordsMockData";

const ACTION_CONST = {
    SET_IS_GAME_STARTED: "SET_IS_GAME_STARTED",
    SET_IS_WORDS_DATA: "SET_WORDS_DATA",
    SET_ACTIVE_CARD: "SET_ACTIVE_CARD",
    SET_CARDS_FOR_SELECTION: "SET_CARDS_FOR_SELECTION",
  };
  
  const DEFAULT_VALUES = {
    EMPTY: "",
    TRUE: true,
    FALSE: false,
    LANGUAGE: "en",
  };
  
  let initialState = {
      wordsData: wordsMockData,
      remainWordsData: wordsMockData,
    activeCard: null,
    cardsForSelection: null,
    isGameStarted: DEFAULT_VALUES.FALSE,
    isAdditionalButtonsShown: DEFAULT_VALUES.TRUE,
    activeLanguage: DEFAULT_VALUES.LANGUAGE,
  };
  
  const savannahReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_CONST.SET_IS_GAME_STARTED: {
        return {
          ...state,
          isGameStarted: action.isGameStarted,
        };
      }
      case ACTION_CONST.SET_ACTIVE_CARD: {  
        const randomValue = Math.floor(Math.random() * Math.floor(state.remainWordsData.length));
        return {
          ...state,
          activeCard: state.remainWordsData[randomValue],
          remainWordsData: [...state.remainWordsData].splice(randomValue, 1)
        };
      }
      case ACTION_CONST.SET_CARDS_FOR_SELECTION: {
        const arrayOfCardsForSelect = [...state.remainWordsData];
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
  
  export default savannahReducer;
  