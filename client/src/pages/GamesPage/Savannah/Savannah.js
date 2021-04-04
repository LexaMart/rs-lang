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
import { sendStatistic } from "../GameUtilities/GameUtilities";

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

  const [levelInputValue, setLevelInputText] = useState(1);
  const [pageInputValue, setPageInputText] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeCard) {
      playActiveCardAudio();
    }
  }, [activeCard]);

  for (let i = 0; i < MAX_NUMBER.LEVEL; i++) {
    levelsArray.push(i + 1);
  }
  for (let i = 0; i < MAX_NUMBER.PAGE; i++) {
    pagesArray.push(i + 1);
  }

  const startGame = () => {
    setDefaultGameSettings();
    setIsGameStarted(GAME_DEFAULT_VALUES.TRUE);
    setRandomActiveCardAndCardsForSelection();
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
      }
    }, [isGameStarted, levelInputValue, pageInputValue, request]),
    [isGameStarted]
  );

  const setDefaultGameSettings = async () => {
    setNumberOfLearnedWords(0);
    setNumberOfIncorrectAnswers(0);
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
    if (word.id === activeCard.id) {
      guessTheWord();
      setNumberOfLearnedWords(numberOfLearnedWords + 1);
      if (isAuthenticated) {
        await request(
          `${urls.API}/users/${userId}/words/${word.id}`,
          "POST",
          {
            difficulty: "learned",
          },
          {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        );
      }
    } else notGuessTheWord();
  };

  const setRandomActiveCardAndCardsForSelection = () => {
    const activeCardIndex = getRandomValue(remainWordsArray.length - 1);
    const remainWordsArrayForSelection = [...remainWordsArray];

    setActiveCard(remainWordsArray[activeCardIndex]);
    setCardsForSelection(() =>
      getRandomCardsForSelect(remainWordsArray[activeCardIndex])
    );
    remainWordsArrayForSelection.splice(activeCardIndex, 1);
    setRemainWordsArray(remainWordsArrayForSelection);
  };

  const guessTheWord = () => {
    if (remainWordsArray.length) {
      setRandomActiveCardAndCardsForSelection();
    } else {
      setIsGameStarted(GAME_DEFAULT_VALUES.FALSE);
      setIsGameWon(GAME_DEFAULT_VALUES.TRUE);
      setActiveCard(null);
      //TODO is it necessary???
      // dispatch(addLearnedWords(numberOfLearnedWords));

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
    }
  };

  const notGuessTheWord = () => {
    const remainLivesArray = [...livesArray];
    remainLivesArray.splice(0, 1);
    setLivesArray(remainLivesArray);
    setNumberOfIncorrectAnswers(numberOfIncorrectAnswers + 1);
    if (!remainLivesArray.length) {
      setIsGameStarted(GAME_DEFAULT_VALUES.FALSE);
      setIsGameLost(GAME_DEFAULT_VALUES.TRUE);
      setActiveCard(null);
      //TODO is it necessary???
      // dispatch(addLearnedWords(numberOfLearnedWords));

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
    }
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

  return (
    <div className="savannah-container">
      <h2>Savannah</h2>
      {!isGameStarted && !isGameLost && (
        <div className="rules">
          In this game you should choose correct translation of given word
        </div>
      )}
      {isGameWon && <div className="win-screen">WON</div>}
      {isGameLost && <div className="lost-screen">LOST</div>}
      {!isGameStarted && currentPage !== "main" && (
        <>
          <Select
            id="select-level"
            multiple={false}
            onChange={(event) => setLevelInputText(event.currentTarget.value)}
            value={levelInputValue}
          >
            {levelsArray.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </Select>
          <Select
            id="select-page"
            multiple={false}
            onChange={(event) => setPageInputText(event.currentTarget.value)}
            value={pageInputValue}
          >
            {pagesArray.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </Select>
        </>
      )}
      {!isGameStarted && (
        <button className="btn red" onClick={startGame}>
          {!isGameLost ? "Start" : "Retry"}
        </button>
      )}
      {isGameStarted && (
        <>
          <div className="lives-container">
            <div>
              <i className="material-icons">favorite </i> x {livesArray.length}
            </div>
          </div>
          <div className="savannah-card_active activeCardFall">
            {activeCard.word}
          </div>
          <div className="selection-container">
            {cardsForSelection.map((word) => {
              return (
                <div
                  key={word.id}
                  onClick={(event) => handleCardClick(event, word)}
                  className="savannah-card btn red"
                >
                  {word.wordTranslate}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
