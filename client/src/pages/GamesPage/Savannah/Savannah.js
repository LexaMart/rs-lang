import React, { useState, useEffect, useCallback } from "react";
import "./Savannah.scss";
import "materialize-css";
import { RS_LANG_API } from "../../../services/rs-lang-api";
import { GAME_DEFAULT_VALUES } from "../../../shared/games-config";
import { wordsMockData } from "../../../shared/wordsMockData";
import { useHttp } from "../../../hooks/http.hook";
import { useKey } from "../../../hooks/keyboardEvents.hook";
import { useSelector, useDispatch } from "react-redux";
import urls from "../../../assets/constants/ursl";
import { Select } from "react-materialize";
import {
  setSavannahLearnedWords,
  setSavannahIncorrectAnswers,
  getStatistic,
} from "../../../redux/statistics-reducer";
import { rsLangApi } from "../../../services/rs-lang-api";
import { sendStatistic } from "../GameUtilities/GameUtilities";
import correctAudio from "../../../assets/sounds/correct.mp3";
import errorAudio from "../../../assets/sounds/error.mp3";
import savannahCrystalImg from "../../../assets/images/savannah_gun.png";
import savannahGrass from "../../../assets/images/savannah-grass.png";
import savannahLion from "../../../assets/images/savannah_lion.png";

const KEYBOARD_KEYS = {
  START_KEYBOARD_USE: "NumpadDivide",
  STOP_KEYBOARD_USE: "NumpadMultiply",
  RESTART_GAME: "NumpadEnter",
  FIRST_NUMBER: "Numpad1",
  SECOND_NUMBER: "Numpad2",
  THIRD_NUMBER: "Numpad3",
  FORTH_NUMBER: "Numpad4",
};

export const MAX_NUMBER = {
  LEVEL: 6,
  PAGE: 30,
};

export const Savannah = () => {
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const optionalStatisticObject = useSelector(
    (store) => store.statisticsStore.statisticsData.optional
  );
  const wholeLearnedWords = useSelector(
    (store) => store.statisticsStore.learnedWords
  );
  const currentPage = useSelector((store) => store.settingsStore.currentPage);
  const currentWordsPage = useSelector(
    (store) => store.settingsStore.currentWordsPage
  );
  const currentWordsGroup = useSelector(
    (store) => store.settingsStore.currentWordsGroup
  );
  const { request } = useHttp();
  const [isGameStarted, setIsGameStarted] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameWon, setIsGameWon] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameLost, setIsGameLost] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [livesArray, setLivesArray] = useState(GAME_DEFAULT_VALUES.LIVES_ARRAY);
  const [wordsArray, setWordsArray] = useState(wordsMockData);
  const [remainWordsArray, setRemainWordsArray] = useState(wordsMockData);
  const [activeCard, setActiveCard] = useState(null);
  const [numberOfLearnedWords, setNumberOfLearnedWords] = useState(0);
  const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
  const levelsArray = [];
  const pagesArray = [];

  const [cardsForSelection, setCardsForSelection] = useState(null);
  const [isWordFalling, setIsWordFalling] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isActiveCardSpacing, setIsActiveCardSpacing] = useState(
    GAME_DEFAULT_VALUES.FALSE
  );

  const [levelInputValue, setLevelInputText] = useState(1);
  const [pageInputValue, setPageInputText] = useState(1);

  const dispatch = useDispatch();

  for (let i = 0; i < MAX_NUMBER.LEVEL; i++) {
    levelsArray.push(i + 1);
  }
  for (let i = 0; i < MAX_NUMBER.PAGE; i++) {
    pagesArray.push(i + 1);
  }

  const startGame = () => {
    setDefaultGameSettings();
    // setIsWordFalling(GAME_DEFAULT_VALUES.FALSE);
    //TODO add spinner
    setIsGameStarted(GAME_DEFAULT_VALUES.TRUE);
    // setRandomActiveCardAndCardsForSelection();

    setTimeout(()=> {
      setIsGameStarted(GAME_DEFAULT_VALUES.TRUE);
      // setRandomActiveCardAndCardsForSelection();

    }, 0)
    if (isAuthenticated) {
      dispatch(getStatistic(userId, token));
    }
  };

  useEffect(
    useCallback(async () => {
      if (isGameStarted) {
        const cards = await request(
          `${urls.API}/words?group=${
            currentPage !== "main" ? levelInputValue - 1 : currentWordsPage
          }&page=${
            currentPage !== "main" ? pageInputValue - 1 : currentWordsGroup
          }`,
          "GET"
        );
        setWordsArray(cards);
       setRemainWordsArray(cards);
        if (cards) {
          setTimeout(()=> {
            //TODO STOP SPINNER
            // setIsWordFalling(GAME_DEFAULT_VALUES.FALSE)
            setRandomActiveCardAndCardsForSelection();
          },3000);
        }
      }
    }, [currentPage, currentWordsGroup, currentWordsPage, isGameStarted, levelInputValue, pageInputValue, request]),
    [isGameStarted]
  );

  const setDefaultGameSettings = async () => {
    setNumberOfLearnedWords(0);
    setNumberOfIncorrectAnswers(0);
    setIsActiveCardSpacing(GAME_DEFAULT_VALUES.FALSE);
    setIsWordFalling(GAME_DEFAULT_VALUES.FALSE);
    setLivesArray(GAME_DEFAULT_VALUES.LIVES_ARRAY);
    setIsGameLost(GAME_DEFAULT_VALUES.FALSE);
    setIsGameWon(GAME_DEFAULT_VALUES.FALSE);
  };

  const getRandomValue = (value) => {
    return Math.floor(Math.random() * Math.floor(value));
  };

  const playActiveCardAudio = () => {
    const audio = new Audio();
    audio.src = `${RS_LANG_API}${activeCard.audio}`;
    audio.play();
  };

  const playCorrectAudio = () => {
    const audio = new Audio();
    audio.src = correctAudio;
    audio.play();
  };
  const playErrorAudio = () => {
    const audio = new Audio();
    audio.src = errorAudio;
    audio.play();
  };

  const getRandomCardsForSelect = (activeCard) => {
    const arrayOfCardsForSelect = [...wordsArray].filter(
      (card) => card.id !== activeCard.id
    );

    //TODO
    const numberOfCards = 3;
    const result = [];
    for (let i = 0; i < numberOfCards; i++) {
      let index = getRandomValue(arrayOfCardsForSelect.length - 1);
      let curCard = arrayOfCardsForSelect[index];
      arrayOfCardsForSelect.splice(index, 1);
      result.push(curCard);
    }
    result.splice(Math.floor(Math.random() * Math.floor(3)), 0, activeCard);

    return result;
  };

  const handleCardClick = async (event, word) => {
    setIsWordFalling(GAME_DEFAULT_VALUES.FALSE);
    if (word.id === activeCard.id) {
      guessTheWord();
      setNumberOfLearnedWords(numberOfLearnedWords + 1);
      if (isAuthenticated) {
        rsLangApi.postUserWord(token, userId, word.id, "learned");
      }
    } else notGuessTheWord();
  };

  const setRandomActiveCardAndCardsForSelection = () => {
    // if (remainWordsArray) {

      const activeCardIndex = getRandomValue(remainWordsArray.length - 1);
      const remainWordsArrayForSelection = [...remainWordsArray];
      setIsActiveCardSpacing(GAME_DEFAULT_VALUES.FALSE);
      setIsWordFalling(GAME_DEFAULT_VALUES.TRUE);
      setTimeout(() => {

      },0)
  
      setActiveCard(remainWordsArray[activeCardIndex]);
      setCardsForSelection(() =>
        getRandomCardsForSelect(remainWordsArray[activeCardIndex])
      );
      remainWordsArrayForSelection.splice(activeCardIndex, 1);
      setRemainWordsArray(remainWordsArrayForSelection);
    // }
  };

  const guessTheWord = () => {
    playCorrectAudio();
    setIsActiveCardSpacing(GAME_DEFAULT_VALUES.TRUE);
    setIsWordFalling(GAME_DEFAULT_VALUES.FALSE);
    if (remainWordsArray.length) {
      setTimeout(() => {
        setRandomActiveCardAndCardsForSelection();
      }, 300);
      // setIsWordFalling(GAME_DEFAULT_VALUES.TRUE);
    } else {
      setIsGameWon(GAME_DEFAULT_VALUES.TRUE);
      setEndGameSettings();
    }
  };

  const notGuessTheWord = () => {
    setIsWordFalling(GAME_DEFAULT_VALUES.TRUE);
    setIsWordFalling(GAME_DEFAULT_VALUES.FALSE);
    playErrorAudio();
    const remainLivesArray = [...livesArray];
    remainLivesArray.splice(0, 1);
    setLivesArray(remainLivesArray);
    setNumberOfIncorrectAnswers(numberOfIncorrectAnswers + 1);
    if (remainLivesArray.length) {
      setTimeout(() => {
        setRandomActiveCardAndCardsForSelection();
      }, 300);
    } else {
      setIsGameLost(GAME_DEFAULT_VALUES.TRUE);
      setEndGameSettings();
    }
  };

  const setEndGameSettings = () => {
    setIsGameStarted(GAME_DEFAULT_VALUES.FALSE);
    setActiveCard(null);
    dispatch(setSavannahLearnedWords(numberOfLearnedWords));
    dispatch(setSavannahIncorrectAnswers(numberOfIncorrectAnswers));
    sendStatistic(
      isAuthenticated,
      userId,
      token,
      wholeLearnedWords,
      optionalStatisticObject,
      numberOfLearnedWords,
      numberOfIncorrectAnswers
    );
  };

  useKey(
    KEYBOARD_KEYS.FIRST_NUMBER,
    () =>
      isGameStarted &&
      cardsForSelection &&
      handleCardClick(null, cardsForSelection[0])
  );
  useKey(
    KEYBOARD_KEYS.SECOND_NUMBER,
    () =>
      isGameStarted &&
      cardsForSelection &&
      handleCardClick(null, cardsForSelection[1])
  );
  useKey(
    KEYBOARD_KEYS.THIRD_NUMBER,
    () =>
      isGameStarted &&
      cardsForSelection &&
      handleCardClick(null, cardsForSelection[2])
  );
  useKey(
    KEYBOARD_KEYS.FORTH_NUMBER,
    () =>
      isGameStarted &&
      cardsForSelection &&
      handleCardClick(null, cardsForSelection[3])
  );
  
  useEffect(() => {
    if (isGameStarted && activeCard ) {
      playActiveCardAudio();
      const interval = setInterval(() => {
        notGuessTheWord();
        // setIsWordFalling(GAME_DEFAULT_VALUES.TRUE);
      }, 5000);
      //TODO handle right guess
      if (!isWordFalling) {
        clearInterval(interval);
      }
      return () => {
        clearInterval(interval);
      };
    }
  }, [activeCard]);


  return (
    <>
      <div className="savannah-container">
        {/* <div className="gallery">

    <div className="left"></div>
    <div className="center">
    
    </div>

    <div className="right"></div>
    </div>
    <div></div>
    <div></div> */}
       
          {!isGameStarted && !isGameLost && (
            <>
              <h2>Savannah</h2>
              <div className="rules">
                In this game you should choose correct translation of given word
              </div>
            </>
          )}
          {isGameWon && <div className="win-screen">WON</div>}
          {isGameLost && <div className="lost-screen">LOST</div>}
          {!isGameStarted && currentPage !== "main" && (
            <>
              <Select
                id="select-level"
                multiple={false}
                onChange={(event) =>
                  setLevelInputText(event.currentTarget.value)
                }
                value={levelInputValue}
              >
                {levelsArray.map((el) => {
                  return <option value={el}>{el}</option>;
                })}
              </Select>
              <Select
                id="select-page"
                multiple={false}
                onChange={(event) =>
                  setPageInputText(event.currentTarget.value)
                }
                value={pageInputValue}
              >
                {pagesArray.map((el) => {
                  return <option value={el}>{el}</option>;
                })}
              </Select>
            </>
          )}

          {isGameStarted && (
            <>
             <div className="savannah-field">
              <div className="lives-container">
                {livesArray.map((el, index) => {
                  return (
                    <i key={`live${el}${index}`} className="material-icons">
                      favorite{" "}
                    </i>
                  );
                })}
              </div>
              {activeCard && (
                <div
                  className={`savannah-card_active ${
                    isWordFalling ? "activeCardFall" : ""
                  } ${isActiveCardSpacing ? "activeCardSpacing" : ""}`}
                >
                  {activeCard.word}
                  <img src={savannahLion} alt="lion"></img>
                </div>
              )}
              {/* {activeCard && (
        <div className={isWordFalling ? `savannah-card_active activeCardFall` : 'savannah-card_active'}>
              {activeCard.word}
            </div>
          )} */}
              {/* {activeCard && (
            <div
              className={`savannah-card_active ${
                isWordFalling ? "activeCardFall" : ""
              } ${isActiveCardSpacing ? "activeCardSpacing" : ""}`}
            >
              {activeCard.word}
            </div>
          )} */}
              {/* <div className="selection-container">
            {cardsForSelection.map((word, index) => {
              return (
                <div
                  key={word.id}
                  onClick={(event) => handleCardClick(event, word)}
                  className="savannah-card btn red"
                >
                  {index + 1}.{word.wordTranslate}
                </div>
              );
            })}
          </div> */}
              <div className="gun-container">
                <img
                  className="savannah_grass"
                  src={savannahGrass}
                  alt="savannah_crystal"
                />
                <img
                  className="savannah_crystal"
                  src={savannahCrystalImg}
                  alt="savannah_crystal"
                />
              </div>
              </div>
            </>
          )}
        </div>
     
      {isGameStarted && cardsForSelection && (
        <div className="selection-container">
          {cardsForSelection.map((word, index) => {
            return (
              <div
                key={word.id}
                onClick={(event) => handleCardClick(event, word)}
                className="savannah-card btn red"
              >
                {index + 1}.{word.wordTranslate}
              </div>
            );
          })}
        </div>
      )}
      {!isGameStarted && (
        <button className="btn red" onClick={startGame}>
          {!isGameLost ? "Start" : "Retry"}
        </button>
      )}
    </>
  );
};
