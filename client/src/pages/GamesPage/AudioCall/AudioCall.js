import React, { useState, useEffect, useCallback } from "react";
import { RS_LANG_API } from "../../../services/rs-lang-api";
import { GAME_DEFAULT_VALUES } from "../../../shared/games-config";
import { wordsMockData } from "../../../shared/wordsMockData";
import { WORDS_CONFIG } from "../../../shared/words-config";
import urls from "../../../assets/constants/ursl";
import { useHttp } from "../../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "react-materialize";
import {
  setAudioCallLearnedWords,
  setAudioCallIncorrectAnswers,
  getStatistic,
} from "../../../redux/statistics-reducer";
import { useKey } from "../../../hooks/keyboardEvents.hook";
import { sendStatistic } from "../GameUtilities/GameUtilities";
import "./audiocall.scss";
import "materialize-css";

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
export const AudioCall = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const optionalStatisticObject = useSelector(
    (store) => store.statisticsStore.statisticsData.optional
  );
  const wholeLearnedWords = useSelector(
    (store) => store.statisticsStore.learnedWords
  );
  const [numberOfLearnedWords, setNumberOfLearnedWords] = useState(0);
  const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);

  const [isGameStarted, setIsGameStarted] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameWon, setIsGameWon] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameLost, setIsGameLost] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [livesArray, setLivesArray] = useState(GAME_DEFAULT_VALUES.LIVES_ARRAY);
  const [wordsArray, setWordsArray] = useState([]);
  const [remainWordsArray, setRemainWordsArray] = useState([]);
  const [activeCard, setActiveCard] = useState();

  const [isImageShown, setIsImageShown] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [cardsForSelection, setCardsForSelection] = useState(null);
  const currentPage = useSelector((store) => store.settingsStore.currentPage);
  const currentWordsPage = useSelector(
    (store) => store.settingsStore.currentWordsPage
  );
  const currentWordsGroup = useSelector(
    (store) => store.settingsStore.currentWordsGroup
  );
  const levelsArray = [];
  const pagesArray = [];
  const [isLoading, setIsLoading] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [levelInputValue, setLevelInputText] = useState(1);
  const [pageInputValue, setPageInputText] = useState(1);
  const { request } = useHttp();
  for (let i = 0; i < MAX_NUMBER.LEVEL; i++) {
    levelsArray.push(i + 1);
  }
  for (let i = 0; i < MAX_NUMBER.PAGE; i++) {
    pagesArray.push(i + 1);
  }

  useEffect(() => {
    if (activeCard) {
      playActiveCardAudio();
    }
  }, [activeCard]);

  const startGame = () => {
    setDefaultGameSettings();
    setIsGameStarted(!isGameStarted);
    if (isAuthenticated) {
      dispatch(getStatistic(userId, token));
    }
  };

  const setDefaultGameSettings = () => {
    setWordsArray(wordsMockData);
    setRemainWordsArray(wordsMockData);
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

  const playActiveCardAudioMeaning = () => {
    const audio = new Audio();
    audio.src = `${RS_LANG_API}${activeCard.audioMeaning}`;
    audio.play();
  };

  const playActiveCardAudioExample = () => {
    const audio = new Audio();
    audio.src = `${RS_LANG_API}${activeCard.audioExample}`;
    audio.play();
  };

  const getRandomCardsForSelect = (wordsArray, activeCard) => {
    const arrayOfCardsForSelect = [...wordsArray].filter(
      (card) => card.id !== activeCard.id
    );

    //TODO
    const cardsLength = 4;
    const result = [];
    for (let i = 0; i < cardsLength; i++) {
      let index = getRandomValue(arrayOfCardsForSelect.length - 1);
      let curCard = arrayOfCardsForSelect[index];
      arrayOfCardsForSelect.splice(index, 1);
      result.push(curCard);
    }
    result.splice(Math.floor(Math.random() * Math.floor(3)), 0, activeCard);

    return result;
  };

  const handleCardClick = (event, word) => {
    word.id === activeCard.id ? guessTheWord() : notGuessTheWord();
  };

  const handleNextButtonClick = () => {
    if (remainWordsArray.length) {
      setRandomActiveCardAndCardsForSelection(wordsArray, remainWordsArray);
    }
    setIsImageShown(GAME_DEFAULT_VALUES.FALSE);
  };

  const setRandomActiveCardAndCardsForSelection = (
    wordsArray,
    remainWordsArray
  ) => {
    const activeCardIndex = getRandomValue(remainWordsArray.length - 1);
    const remainWordsArrayForSelection = [...remainWordsArray];

    setActiveCard(remainWordsArray[activeCardIndex]);
    setCardsForSelection(() =>
      getRandomCardsForSelect(wordsArray, remainWordsArray[activeCardIndex])
    );
    remainWordsArrayForSelection.splice(activeCardIndex, 1);
    setRemainWordsArray(remainWordsArrayForSelection);
  };

  const guessTheWord = () => {
    setIsImageShown(GAME_DEFAULT_VALUES.TRUE);
    setNumberOfLearnedWords(numberOfLearnedWords + 1);
    if (!remainWordsArray.length) {
      setIsGameStarted(GAME_DEFAULT_VALUES.FALSE);
      setIsImageShown(GAME_DEFAULT_VALUES.FALSE);
      setIsGameWon(GAME_DEFAULT_VALUES.TRUE);
      setActiveCard(null);
      dispatch(setAudioCallLearnedWords(numberOfLearnedWords));
      dispatch(setAudioCallIncorrectAnswers(numberOfIncorrectAnswers));
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
      setIsImageShown(GAME_DEFAULT_VALUES.FALSE);
      setIsGameLost(GAME_DEFAULT_VALUES.TRUE);
      setActiveCard(null);
      dispatch(setAudioCallLearnedWords(numberOfLearnedWords));
      dispatch(setAudioCallIncorrectAnswers(numberOfIncorrectAnswers));
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
        setIsLoading(GAME_DEFAULT_VALUES.FALSE);
        setRandomActiveCardAndCardsForSelection(cards, cards);
      }
    }, [
      currentPage,
      currentWordsGroup,
      currentWordsPage,
      isGameStarted,
      levelInputValue,
      pageInputValue,
      request,
    ]),
    [isGameStarted]
  );

  return (
    <div className="savannah-container">
      {!isGameStarted && currentPage !== "main" && (
        <>
          <h2>AudioCall</h2>
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
        <>
          <div className="rules">
            In this game you should choose correct translation of audio that you
            listen
          </div>
          <button className="btn red" onClick={startGame}>
            {!isGameLost ? "Start" : "Retry"}
          </button>
        </>
      )}
      {isGameWon && <div className="win-screen">WIN</div>}
      {isGameLost && <div className="lost-screen">LOST</div>}
      {isGameStarted && activeCard && (
        <>
          <div className="lives-container">
            <div>
              <i className="material-icons">favorite </i> x {livesArray.length}
            </div>
          </div>
          <div className="additional__info">
            {isImageShown && (
              <>
                <div className="text_container">
                  <div className="white-text word_text">
                    {activeCard.transcription}
                  </div>
                  <button className="btn play" onClick={playActiveCardAudio}>
                    <i className="material-icons">volume_up </i>
                  </button>
                </div>
                <img
                  className="correct_word_image"
                  src={`${RS_LANG_API}${activeCard.image}`}
                  alt="word_image"
                />
                <div className="text_container">
                  <div
                    className="white-text word_text"
                    dangerouslySetInnerHTML={{ __html: activeCard.textMeaning }}
                  ></div>
                  <button
                    className="btn play"
                    onClick={playActiveCardAudioMeaning}
                  >
                    <i className="material-icons">volume_up </i>
                  </button>
                </div>
                <div
                  className="white-text word_text"
                  dangerouslySetInnerHTML={{
                    __html: activeCard.textExampleTranslate,
                  }}
                ></div>
                <div className="text_container">
                  <div
                    className="white-text word_text"
                    dangerouslySetInnerHTML={{ __html: activeCard.textExample }}
                  ></div>
                  <button
                    className="btn play"
                    onClick={playActiveCardAudioExample}
                  >
                    <i className="material-icons">volume_up </i>
                  </button>
                </div>
                <div className="white-text word_text">
                  {activeCard.textMeaningTranslate}
                </div>
              </>
            )}
          </div>
          {!isImageShown && (
            <button className="btn play" onClick={playActiveCardAudio}>
              <i className="material-icons">volume_up </i>
            </button>
          )}
          <button className="btn" onClick={handleNextButtonClick}>
            Next
          </button>
          {isGameStarted && cardsForSelection && (
            <div
              className={
                isImageShown
                  ? "selection-audio-container-end"
                  : "selection-audio-container"
              }
            >
              {cardsForSelection.map((word) => {
                return (
                  <div
                    key={word.id}
                    onClick={(event) => handleCardClick(event, word)}
                    className="btn red audiocall-card"
                  >
                    {word.wordTranslate}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
