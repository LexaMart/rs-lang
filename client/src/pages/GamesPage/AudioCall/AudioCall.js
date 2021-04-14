import React, { useState, useEffect, useCallback } from "react";
import { RS_LANG_API } from "../../../services/rs-lang-api";
import { GAME_DEFAULT_VALUES } from "../../../shared/games-config";
import { wordsMockData } from "../../../shared/wordsMockData";
import { rsLangApi } from "../../../services/rs-lang-api";
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import {
  WORDS_CONFIG,
  WORDS_CATEGORIES,
  CURRENT_PAGE_NAME,
  LANGUAGE_CONFIG,
} from "../../../shared/words-config";
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
import { MainPagePreloader } from "../../../components/Loader";

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
  const handleFullScreen = useFullScreenHandle();
  const wholeLearnedWords = useSelector(
    (store) => store.statisticsStore.learnedWords
  );
  const activeLanguage = useSelector(
    (store) => store.settingsStore.activeLanguage
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
  const userDeletedWords = useSelector(
    (store) => store.authStore.userDeletedWords
  );
  const userLearningWords = useSelector((store) => store.authStore.userLearningWords);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const result = [];
    for (let i = 0; i < GAME_DEFAULT_VALUES.AUDIOCALL_CARDS_NUMBER - 1; i++) {
      let index = getRandomValue(arrayOfCardsForSelect.length - 1);
      let curCard = arrayOfCardsForSelect[index];
      arrayOfCardsForSelect.splice(index, 1);
      result.push(curCard);
    }
    result.splice(
      Math.floor(Math.random() * Math.floor(GAME_DEFAULT_VALUES.AUDIOCALL_CARDS_NUMBER)),
      0,
      activeCard
    );

    return result;
  };

  const handleCardClick = (event, word) => {
   if (word.id === activeCard.id) {
    guessTheWord()
    if (isAuthenticated && !userLearningWords.includes(word.id)) {
      rsLangApi.postUserWord(
        token,
        userId,
        word.id,
        WORDS_CATEGORIES.learned
      );
    }
   } else notGuessTheWord();
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
    } else
      setRandomActiveCardAndCardsForSelection(wordsArray, remainWordsArray);
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
            currentPage !== CURRENT_PAGE_NAME.MAIN
              ? levelInputValue - 1
              : currentWordsGroup
            }&page=${
              currentPage !== CURRENT_PAGE_NAME.MAIN
              ? pageInputValue - 1
              : currentWordsPage
          }`,
          "GET"
        );
        setIsLoading(GAME_DEFAULT_VALUES.FALSE);
        const filteredCards = cards.filter(word => !userDeletedWords.includes(word.id));
        if (filteredCards.length) {
          setWordsArray(cards);
          setRemainWordsArray(filteredCards);
          setRandomActiveCardAndCardsForSelection(cards, filteredCards);
        }
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

  if (isLoading) return <MainPagePreloader />;

  return (
    <>
        <button  className="btn full_screen_btn"  onClick={handleFullScreen.enter}>{activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.FULL_SCREEN_BUTTON.native
                : WORDS_CONFIG.FULL_SCREEN_BUTTON.foreign}</button>
    <FullScreen handle={handleFullScreen} >
    <div className="audiocall-container">
      {!isGameStarted && currentPage !== CURRENT_PAGE_NAME.MAIN && (
        <>
          <h2>
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.AUDIO_CALL.native
              : WORDS_CONFIG.AUDIO_CALL.foreign}
          </h2>
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
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.AUDIO_CALL_RULES.native
              : WORDS_CONFIG.AUDIO_CALL_RULES.foreign}
          </div>
          <button className="btn red" onClick={startGame}>
            {!isGameLost
              ? activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.START_BUTTON.native
                : WORDS_CONFIG.START_BUTTON.foreign
              : activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.RETRY_BUTTON.native
              : WORDS_CONFIG.RETRY_BUTTON.foreign}
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
                <img
                  className="correct_word_image"
                  src={`${RS_LANG_API}${activeCard.image}`}
                  alt="word_image"
                />
                <div className="text_container">
                  <div className="white-text word_text">
                    {activeCard.transcription}
                  </div>
                  <button className="btn play" onClick={playActiveCardAudio}>
                    <i className="material-icons">volume_up </i>
                  </button>
                </div>
                <div className="text_container">
                  <div>
                    <div
                      className="white-text word_text"
                      dangerouslySetInnerHTML={{
                        __html: activeCard.textExample,
                      }}
                    ></div>
                    <div
                      className="white-text word_text"
                      dangerouslySetInnerHTML={{
                        __html: activeCard.textExampleTranslate,
                      }}
                    ></div>
                  </div>
                  <button
                    className="btn play"
                    onClick={playActiveCardAudioExample}
                  >
                    <i className="material-icons">volume_up </i>
                  </button>
                </div>
                <div className="text_container">
                  <div>
                    <div
                      className="white-text word_text"
                      dangerouslySetInnerHTML={{
                        __html: activeCard.textMeaning,
                      }}
                    ></div>
                    <div className="white-text word_text">
                      {activeCard.textMeaningTranslate}
                    </div>
                  </div>
                  <button
                    className="btn play"
                    onClick={playActiveCardAudioMeaning}
                  >
                    <i className="material-icons">volume_up </i>
                  </button>
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
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.NEXT_BUTTON.native
              : WORDS_CONFIG.NEXT_BUTTON.foreign}
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
      </FullScreen>
      </>
  );
};
